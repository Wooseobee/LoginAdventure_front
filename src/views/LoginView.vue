<script setup>
import { ref } from 'vue';
import { getCookie } from "@/assets/js/util/cookie.js"
const id = ref(getCookie("id"));

const login = () => {

}

const logout = () => {

}

const styleLoginModal = ref({
    display: 'none',
});

const loginModal = () => {
    styleLoginModal.value.display = 'block';
}

const closeLoginBtn = () => {
    styleLoginModal.value.display = 'none';
}

const styleSignupModal = ref({
    display: 'none',
});

const signupModal = () => {
    styleSignupModal.value.display = 'block';
}

const closeSignupBtn = () => {
    styleSignupModal.value.display = 'none';
}

</script>

<template>
    <div>
        <div v-if="!id">
            <button @click="signupModal" type="button" id="signup">회원가입</button>
            <button @click="loginModal" type="button" id="login">로그인</button>
        </div>
        <div v-else>
            <span>{{ id }} 님</span>
            <button @click="logout" id="logout" style="margin-left:5px">로그아웃</button>
        </div>
        <div>
            <!-- 회원가입 Modal -->
            <div :style="styleSignupModal" id="signupModal" class="modalWrap">
                <div id="modalBody" class="modalBody">
                    <span @click="closeSignupBtn" id="closeSignupBtn" class="closeBtn">&times;</span>
                    <div class="form">
                        <form name="register-form" class="register-form">
                            <input id="id" name="id" type="text" placeholder="아이디" /> <input id="password" name="password"
                                type="password" placeholder="비밀번호" />
                            <input id="name" name="name" type="text" placeholder="이름" />
                            <input id="rrn" name="rrn" type="text" placeholder="주민번호" />
                            <button id="signup-submit" type="button">회원 등록</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- 로그인 Modal -->
            <div :style="styleLoginModal" v-if="!modalOpened" id="loginModal" class="modalWrap">
                <div id="modalBody" class="modalBody">
                    <span @click="closeLoginBtn" id="closeLoginBtn" class="closeBtn">&times;</span>
                    <div class="form">
                        <form name="login-form" class="login-form">
                            <input id="id-login" name="id" type="text" placeholder="아이디" /> <input id="password-login"
                                name="password" type="password" placeholder="비밀번호" />
                            <button id="login-btn" type="button">로그인</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>