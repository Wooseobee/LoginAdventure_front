<script setup>
import { ref } from "vue";
import {useMemberStore} from "@/stores/member";
import * as RSA from "@/assets/js/encrypt/rsa";
import {deleteCookie, getCookie} from "@/assets/js/util/cookie";
import {goodbye, modify} from "@/api/user";

const userStore = useMemberStore();
const rsa = new RSA.RSAKey();
const goodbyePw = ref('');
const curPw = ref('');
const newPw = ref('');
const pwMsg = ref('');
const pwMsg1 = ref('');
const pwMsg2 = ref('');
const pwIsValid = ref(true);
const pwIsValid1 = ref(true);
const pwIsValid2 = ref(true);

const pwCheck = () => {
    const password = curPw.value;
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
        pwIsValid1.value = true;
    } else {
        pwIsValid1.value = false;
        if (password.length > 0) {
            pwMsg1.value =
                "8자 이상 16자 영어 대소문자, 숫자, 특수문자(' ', '<', '>' 제외) 중 3가지 이상 사용해 주세요.";
        } else {
            pwMsg1.value = '필수 정보입니다.';
        }
    }
};

const pwCheck1 = () => {
    const password = curPw.value;
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
        pwIsValid1.value = true;
    } else {
        pwIsValid1.value = false;
        if (password.length > 0) {
            pwMsg1.value =
                "8자 이상 16자 영어 대소문자, 숫자, 특수문자(' ', '<', '>' 제외) 중 3가지 이상 사용해 주세요.";
        } else {
            pwMsg1.value = '필수 정보입니다.';
        }
    }
};
const pwCheck2 = () => {
    const password = newPw.value;
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
        pwIsValid2.value = true;
    } else {
        pwIsValid2.value = false;
        if (password.length > 0) {
            pwMsg2.value =
                "8자 이상 16자 영어 대소문자, 숫자, 특수문자(' ', '<', '>' 제외) 중 3가지 이상 사용해 주세요.";
        } else {
            pwMsg2.value = '필수 정보입니다.';
        }
    }
};
const styleModifyModal = ref({
  display: 'none',
})

const modifyModal = () => {
  userStore.heightUser();
  styleModifyModal.value.display = 'block';
};

const closeModifyBtn = () => {
    styleModifyModal.value.display = 'none';
    curPw.value = '';
    newPw.value = '';
    pwIsValid1.value = true;
    pwIsValid2.value = true;
};

const styleDeleteModal = ref({
  display: 'none',
})

const goodbyeModal = () => {
  userStore.heightUser();
  styleDeleteModal.value.display = 'block';
};

const closeGoodbyeBtn = () => {
    styleDeleteModal.value.display = 'none';
    goodbyePw.value = '';
    pwIsValid.value = true;
};

const modifyUser = () => {
  let userid, atk;
  if(!userStore.rememberMe) {
      userid = sessionStorage.getItem("id");
      atk = sessionStorage.getItem("atk");
  } else {
      userid = getCookie("id");
      atk = getCookie("atk");
  }
  const body = {
    uuid: userStore.uuid,
    userid: userid,
    atk: atk,
    curPw: encryptText(curPw.value),
    newPw: encryptText(newPw.value),
  }

  modify(
      body,
      ({data}) => {
          closeModifyBtn();
      },
      (err) => {
          if (err.response.data.code === 15) {
              const res = userStore.reissueToken();
              if (res) {
                  modifyUser();
              }
          }
      }
  )
};

const goodbyeUser = () => {
    let userid, atk;
    if(!userStore.rememberMe) {
        userid = sessionStorage.getItem("id");
        atk = sessionStorage.getItem("atk");
    } else {
        userid = getCookie("id");
        atk = getCookie("atk");
    }
    const body = {
      uuid: userStore.uuid,
      userid: userid,
      atk: atk,
      password: encryptText(curPw.value)
    }
    goodbye(
        body,
        () => {
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
            alert("저희 사이트를 이용해주셔서 감사합니다.");
            closeGoodbyeBtn();
        },
        (err) => {
            if (err.response.data.code === 15) {
                const res = userStore.reissueToken();
                if (res) {
                    goodbyeUser();
                }
            }
        }
    )
};

const encryptText = (text) => {
    rsa.setPublic(userStore.modulus, userStore.exponent);
    return rsa.encrypt(text);
};
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="input-group mb-3 col">
        <button class="btn btn-outline-secondary" type="button" @click="modifyModal">비밀번호 변경</button>
      </div>
      <div class="input-group mb-3 col">
        <button class="btn btn-outline-secondary" type="button" @click="goodbyeModal">회원탈퇴</button>
      </div>
    </div>
  </div>
  <div>
    <!-- 비밀번호 변경 Modal -->
    <div :style="styleModifyModal" id="ModifyModal" class="modalWrap">
      <div id="modalBody" class="modalBody">
        <span @click="closeModifyBtn" id="closeModifyBtn" class="closeBtn">&times;</span>
        <div class="form">
          <form name="signuper-form" class="signuper-form">
            <input v-model="curPw" @blur="pwCheck1" id="password1" name="password" type="password" placeholder="기존 비밀번호" />
            <div v-show="!pwIsValid1" class="validity-info" id="validity-pw">
                기존 비밀번호: {{ pwMsg1 }}
            </div>
            <input v-model="newPw" @blur="pwCheck2" id="password2" name="password" type="password" placeholder="새로운 비밀번호" />
            <div v-show="!pwIsValid2" class="validity-info" id="validity-pw">
                새로운 비밀번호: {{ pwMsg2 }}
            </div>
            <button @click="modifyUser" id="Modify-submit" type="button">비밀번호 변경</button>
          </form>
        </div>
      </div>
    </div>
    <!-- 회원탈퇴 Modal -->
    <div :style="styleDeleteModal" id="GoodbyeModal" class="modalWrap">
        <div id="modalBody" class="modalBody">
            <span @click="closeGoodbyeBtn" id="closeGoodbyeBtn" class="closeBtn">&times;</span>
            <div class="form">
                <form>
                    <input v-model="goodbyePw" @blur="pwCheck" id="password" name="password" type="password" placeholder="비밀번호" />
                    <div v-show="!pwIsValid" class="validity-info" id="validity-pw">
                        비밀번호: {{ pwMsg }}
                    </div>
                    <button @click="goodbyeUser" id="Modify-submit" type="button">회원탈퇴</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.validity-info {
    color: red;
    margin-bottom: 15px;
    text-wrap: wrap;
    font-size: 13px;
}

#ModifyModal {
    z-index: 1;
}
#GoodbyeModal {
    z-index: 1;
}
</style>
