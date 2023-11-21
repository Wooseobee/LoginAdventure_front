<script setup>
import { ref } from 'vue';
import { setCookie } from "@/assets/js/util/cookie.js";
import { login } from '@/api/user.js';
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

const styleLoginModal = ref({
  display: 'none',
});

const loginModal = () => {
  userStore.heightUser();
  styleLoginModal.value.display = 'block';
};

const closeLoginBtn = () => {
  styleLoginModal.value.display = 'none';
};

const styleSignupModal = ref({
  display: 'none',
});

const signupModal = () => {
  userStore.heightUser();
  styleSignupModal.value.display = 'block';
};

const closeSignupBtn = () => {
  styleSignupModal.value.display = 'none';
};

const signupUser = () => {
  if (
    !signupId.value.trim() ||
    !signupPw.value.trim() ||
    !signupEmail.value.trim() ||
    !signupName.value.trim()
  ) {
    alert('빈칸이 없도록 입력해주세요.');
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
          console.log("로그인 유지X");
          sessionStorage.setItem("id", body.userid);
          sessionStorage.setItem("atk", data.data.atk);
          sessionStorage.setItem("rtk", data.data.rtk);
        } else {
          console.log("로그인 유지O");
          setCookie("id", body.userid);
          setCookie("atk", data.data.atk);
          setCookie("rtk", data.data.rtk);
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
    console.log(userStore.id);
    const body = {
      userid: userStore.id,
      atk: sessionStorage.getItem("atk"),
    }
    userStore.logoutUser(body);
  }
};

const encryptText = (text) => {
  rsa.setPublic(userStore.modulus, userStore.exponent);
  return rsa.encrypt(text);
}
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
              <input v-model="signupId" id="id" name="id" type="text" placeholder="아이디" />
              <input v-model="signupPw" id="password" name="password" type="password" placeholder="비밀번호" />
              <input v-model="signupEmail" id="email" name="email" type="email" placeholder="이메일">
              <input v-model="signupName" id="name" name="name" type="text" placeholder="이름" />
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
              <input v-model="loginPw" id="password-login" name="password" type="password" placeholder="비밀번호" />
              <input v-model="rememberMe" id="rememberMe" type="checkbox"> 로그인 유지
              <button @click="loginUser" id="login-btn" type="button">로그인</button>
              <a
                href="https://kauth.kakao.com/oauth/authorize?client_id=0fcbc84f0fab706f3524ed52931c49d4&redirect_uri=http://localhost:8080/user/kakaologin&response_type=code">
                <img src="@/assets/kakao_login_small.png">
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
</style>
