<script setup>
import { ref } from "vue";

const curPw = ref('');
const newPw = ref('');

const styleModifyModal = ref({
  display: 'none',
})

const modifyModal = () => {
  styleModifyModal.value.display = 'block';
};

const closeModifyBtn = () => {
  styleLoginModal.value.display = 'none';
};

const styleDeleteModal = ref({
  display: 'none',
})

const deleteModal = () => {
  styleModifyModal.value.display = 'block';
};

const closeDeleteBtn = () => {
  styleLoginModal.value.display = 'none';
};

const modify = () => {
  const body = {
    uuid: userStore.uuid,
    userid: userStore.id,
    curPw: userStore.encryptText(curPw.value),
    newPw: userStore.encryptText(newPw.value),
  }

  userStore.modify(body);
};

const goodbye = () => {
  const body = {
    uuid: userStore.uuid,
    userid: userStore.id,
    password: encryptText(curPw.value)
  }

  userStore.modify(body);
};
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="input-group mb-3 col">
        <button class="btn btn-outline-secondary" type="button" @click="modify">비밀번호 변경</button>
      </div>
      <div class="input-group mb-3 col">
        <button class="btn btn-outline-secondary" type="button" @click="goodbye">회원탈퇴</button>
      </div>
    </div>
  </div>
  <div>
    <!-- 회원가입 Modal -->
    <div :style="styleModifyModal" id="ModifyModal" class="modalWrap">
      <div id="modalBody" class="modalBody">
        <span @click="closeModifyBtn" id="closeModifyBtn" class="closeBtn">&times;</span>
        <div class="form">
          <form name="signuper-form" class="signuper-form">
            <input v-model="ModifyId" @blur="idCheck" id="id" name="id" type="text" placeholder="아이디" />
            <div v-show="!idIsValid" class="validity-info" id="validity-id">
              아이디: {{ idMsg }}
            </div>
            <input v-model="ModifyPw" @blur="pwCheck" id="password" name="password" type="password" placeholder="비밀번호" />
            <div v-show="!pwIsValid" class="validity-info" id="validity-pw">
              비밀번호: {{ pwMsg }}
            </div>
            <input v-model="ModifyEmail" @blur="emailCheck" id="email" name="email" type="email" pattern=".+@example\.com"
              placeholder="이메일" required />
            <div v-show="!emailIsValid" class="validity-info" id="validity-email">
              이메일: {{ emailMsg }}
            </div>
            <input v-model="ModifyName" id="name" name="name" type="text" placeholder="이름" />
            <div v-show="!nameIsValid" class="validity-info" id="validity-name">
              이름: 필수 정보입니다.
            </div>
            <button @click="ModifyUser" id="Modify-submit" type="button">회원 등록</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
