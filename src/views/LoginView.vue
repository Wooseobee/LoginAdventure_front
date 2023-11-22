<script setup>
  import { ref, watch } from 'vue';
  import {deleteCookie, getCookie, setCookie} from '@/assets/js/util/cookie.js';
  import {login, logout, uniqueCheck, uniqueCheckEmail } from '@/api/user.js';
  import { useMemberStore } from '@/stores/member';
  import * as RSA from '@/assets/js/encrypt/rsa.js';

  const userStore = useMemberStore();

  const signupId = ref('');
  const signupPw = ref('');
  const signupEmail = ref('');
  const signupName = ref('');
  const loginId = ref('');
  const loginPw = ref('');
  const rsa = new RSA.RSAKey();

  // 입력 패턴 체킹
  const emailIsValid = ref(true);
  const idIsValid = ref(true);
  const pwIsValid = ref(true);
  const nameIsValid = ref(true);

  const idMsg = ref('');
  const pwMsg = ref('');
  const emailMsg = ref('');

  // 아이디 이메일 중복확인값
  const checkedId = ref('');
  const checkedEmail = ref('');

  const idCheck = () => {
    const id = signupId.value;
    if (checkedId.value !== id) {
      if (String(id).match(/^[a-z0-9_-_-]{5,20}$/)) {
        idIsValid.value = true;
        // 아이디 중복체크 -> 아직 확인되지 않았으면
        const body = { userid: id };
        uniqueCheck(
          body,
          ({ data }) => {
            if (!data.data.available) {
              idIsValid.value = false;
              idMsg.value = '사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.';
            }
            checkedId.value = id;
          },
          (err) => {
            console.log('중복체크 실패');
            console.log(err);
          }
        );
      } else {
        idIsValid.value = false;
        if (id) {
          idMsg.value = "5~20자의 영문 소문자, 숫자와 특수기호'_', '-'만 사용 가능합니다.";
        } else {
          idMsg.value = '필수 정보입니다.';
        }
      }
    }
  };

  const pwCheck = () => {
    const password = signupPw.value;
    const regex =
      /^(?=(?:.*[a-z]))?(?=(?:.*[A-Z]))?(?=(?:.*[0-9]))?(?=(?:.*[!@#$%^&*()_+={}\[\]|\\:;"'.,/?~]))?([a-zA-Z0-9!@#$%^&*()_+={}\[\]|\\:;"'.,/?~](?! *[<> ])){8,16}$/;

    const lowercaseCount = /[a-z]/;
    const uppercaseCount = /[A-Z]/;
    const numberCount = /[0-9]/;
    const specialCharCount = /[!@#$%^&*()_+={}\[\]|\\:;"'.,/?~]/;

    const types = [
      lowercaseCount.test(password),
      uppercaseCount.test(password),
      numberCount.test(password),
      specialCharCount.test(password),
    ].filter(Boolean).length;

    if (types >= 3 && regex.test(password)) {
      pwIsValid.value = true;
    } else {
      pwIsValid.value = false;
      if (password.length > 0) {
        pwMsg.value =
          "8자 이상 16자 영어 대소문자, 숫자, 특수문자(' ', '<', '>' 제외) 중 3가지 이상 사용해 주세요.";
      } else {
        pwMsg.value = '필수 정보입니다.';
      }
    }
  };

  const emailCheck = () => {
    const email = signupEmail.value;
    if (checkedEmail.value!== email) {
      if (
        String(email).match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        emailIsValid.value = true;
        // 이메일 중복체크 -> 아직 확인되지 않았으면
        const body = { email: email };
        uniqueCheckEmail(
          body,
          ({ data }) => {
            console.log('email check ok');
            if (!data.data.available) {
              emailIsValid.value = false;
              emailMsg.value = '사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요.';
            }
            checkedEmail.value = email;
          },
          (err) => {
            console.log('email 중복체크 실패');
            console.log(err);
          }
        );
      } else {
        emailIsValid.value = false;
        if (email) {
          emailMsg.value = '주소가 정확한지 확인해 주세요.';
        } else {
          emailMsg.value = '필수 정보입니다.';
        }
      }
    }
  };

  watch(signupName, () => {
    !signupName.value ? (nameIsValid.value = false) : (nameIsValid.value = true);
  });

  const styleLoginModal = ref({
    display: 'none',
  });

  const loginModal = () => {
    userStore.heightUser();
    styleLoginModal.value.display = 'block';
  };

  const closeLoginBtn = () => {
    styleLoginModal.value.display = 'none';
    loginId.value = '';
    loginPw.value = '';
  };

  const styleSignupModal = ref({
    display: 'none',
  });

  const signupModal = () => {
    userStore.heightUser();
    styleSignupModal.value.display = 'block';
  };

  const closeSignupBtn = () => {
    signupId.value = '';
    signupPw.value = '';
    signupEmail.value = '';
    signupName.value = '';
    checkedId.value = '';
    emailIsValid.value = true;
    idIsValid.value = true;
    pwIsValid.value = true;
    nameIsValid.value = true;
    styleSignupModal.value.display = 'none';
  };

  const signupUser = () => {
    idCheck();
    pwCheck();
    emailCheck();
    if (
      !signupId.value.trim() ||
      !signupPw.value.trim() ||
      !signupEmail.value.trim() ||
      !signupName.value.trim()
    ) {
      alert('빈칸이 없도록 입력해주세요.');
    } else if (!idIsValid || !pwIsValid || !emailIsValid || !nameIsValid) {
      alert('입력 값들을 다시 확인해주세요.');
    } else {
      const body = {
        uuid: userStore.uuid,
        userid: signupId.value,
        password: encryptText(signupPw.value),
        email: encryptText(signupEmail.value),
        username: encryptText(signupName.value),
      };

      userStore.signupUser(body);
      closeSignupBtn();
      alert("회원가입 완료");
    }
  };
  const loginUser = () => {
    if (!loginId.value.trim() || !loginPw.value.trim()) {
      alert('빈칸이 없도록 입력해주세요.');
    } else {
      const body = {
        uuid: userStore.uuid,
        userid: loginId.value,
        password: encryptText(loginPw.value),
      };

      login(
        body,
        ({ data }) => {
          if (!userStore.rememberMe) {
            console.log('로그인 유지X');
            sessionStorage.setItem('id', body.userid);
            sessionStorage.setItem('atk', data.data.atk);
            sessionStorage.setItem('rtk', data.data.rtk);
          } else {
            console.log('로그인 유지O');
            setCookie('id', body.userid);
            setCookie('atk', data.data.atk);
            setCookie('rtk', data.data.rtk);
          }
          userStore.id = body.userid;
          closeLoginBtn();
        },
        (err) => {
          console.log(err);
          alert('로그인 실패했습니다');
        }
      );
    }
  };

  const logoutUser = () => {
    if (!userStore.id) {
      alert('로그인부터 해주세요.');
    } else {
        let userid, atk;
        if(!userStore.rememberMe) {
            userid = sessionStorage.getItem("id");
            atk = sessionStorage.getItem("atk");
        } else {
            userid = getCookie("id");
            atk = getCookie("atk");
        }
        const body = {
            userid: userid,
            atk: atk,
        }
        logout(
            body,
            ({data}) => {
                if (!userStore.rememberMe) {
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("atk");
                    sessionStorage.removeItem("rtk");
                } else {
                    deleteCookie("id");
                    deleteCookie("atk");
                    deleteCookie("rtk");
                }
                userStore.id = "";
                userStore.isSearch = true;
                userStore.isPlan = false;
                userStore.isMyInfo = false;
                userStore.rememberMe = false;
            },
            (err) => {
                if (err.response.data.code === 15) {
                    const res = userStore.reissueToken();
                    if (res) {
                        logoutUser();
                    }
                }
            }
        );
    }
  };

  const encryptText = (text) => {
    rsa.setPublic(userStore.modulus, userStore.exponent);
    return rsa.encrypt(text);
  };
</script>

<template>
  <div>
    <div v-if="!userStore.id">
      <button @click="signupModal" type="button" id="signup">회원가입</button>
      <button @click="loginModal" type="button" id="login">로그인</button>
    </div>
    <div v-else>
      <span>{{ userStore.id }} 님</span>
      <button @click="logoutUser" id="logout" style="margin-left: 5px">로그아웃</button>
    </div>
    <div>
      <!-- 회원가입 Modal -->
      <div :style="styleSignupModal" id="signupModal" class="modalWrap">
        <div id="modalBody" class="modalBody">
          <span @click="closeSignupBtn" id="closeSignupBtn" class="closeBtn">&times;</span>
          <div class="form">
            <form name="signuper-form" class="signuper-form">
              <input
                v-model="signupId"
                @blur="idCheck"
                id="id"
                name="id"
                type="text"
                placeholder="아이디"
              />
              <div v-show="!idIsValid" class="validity-info" id="validity-id">
                아이디: {{ idMsg }}
              </div>
              <input
                v-model="signupPw"
                @blur="pwCheck"
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
              />
              <div v-show="!pwIsValid" class="validity-info" id="validity-pw">
                비밀번호: {{ pwMsg }}
              </div>
              <input
                v-model="signupEmail"
                @blur="emailCheck"
                id="email"
                name="email"
                type="email"
                pattern=".+@example\.com"
                placeholder="이메일"
                required
              />
              <div v-show="!emailIsValid" class="validity-info" id="validity-email">
                이메일: {{ emailMsg }}
              </div>
              <input v-model="signupName" id="name" name="name" type="text" placeholder="이름" />
              <div v-show="!nameIsValid" class="validity-info" id="validity-name">
                이름: 필수 정보입니다.
              </div>
              <button @click="signupUser" id="signup-submit" type="button">회원 등록</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 로그인 Modal -->
      <div :style="styleLoginModal" id="loginModal" class="modalWrap">
        <div id="modalBody" class="modalBody">
          <span @click="closeLoginBtn" id="closeLoginBtn" class="closeBtn">&times;</span>
          <div class="form">
            <form name="login-form" class="login-form">
              <input v-model="loginId" id="id-login" name="id" type="text" placeholder="아이디" />
              <input
                v-model="loginPw"
                id="password-login"
                name="password"
                type="password"
                placeholder="비밀번호"
              />
              <input v-model="userStore.rememberMe" id="rememberMe" type="checkbox" /> 로그인 유지
              <button @click="loginUser" id="login-btn" type="button">로그인</button>
              <a
                href="https://kauth.kakao.com/oauth/authorize?client_id=0fcbc84f0fab706f3524ed52931c49d4&redirect_uri=http://localhost:8080/user/kakaologin&response_type=code"
              >
                <img src="@/assets/kakao_login_small.png" />
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #signup {
    margin-inline-end: 10px;
  }

  #rememberMe {
    -webkit-appearance: none;
    /* Chrome, Safari, Edge */
    -moz-appearance: none;
    /* Firefox */
    appearance: none;
    /* Standard */
    border: 1px solid #ccc;
    width: 1px;
    height: 1px;
  }

  #rememberMe:checked {
    background-color: #258fff;
    /* 체크된 상태의 배경색 */
    border-color: #258fff;
    /* 체크된 상태의 테두리 색 */
  }

  #rememberMe::before {
    all: initial;
    /* 모든 CSS 속성 초기화 */
    content: '';
    /* 초기화 후 content 속성 재설정 */
    display: inline-block;
    /* 인라인 블록 요소로 설정 */
  }

  .validity-info {
    color: red;
    margin-bottom: 15px;
    text-wrap: wrap;
    font-size: 13px;
  }
</style>
