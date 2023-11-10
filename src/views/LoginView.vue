<script setup>
import { ref } from 'vue';
import { setCookie, getCookie, deleteCookie } from "@/assets/js/util/cookie.js"
import { signup, login, logout } from "@/api/user.js"
const id = ref(getCookie("id"));
const signupId = ref("");
const signupPw = ref("");
const signupName = ref("");
const signupRrn = ref("");

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

const signupUser = () => {
    if (!signupId.value.trim() || !signupPw.value.trim()
        || !signupName.value.trim() || !signupRrn.value.trim()) {
        alert("빈칸이 없도록 입력해주세요.");
    } else {
        const body = {
            userid: signupId.value,
            userpassword: signupPw.value,
            username: signupName.value,
            rrn: signupRrn.value
        };

        signup(
            body,
            ({ data }) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

const loginId = ref("");
const loginPw = ref("");
const loginUser = () => {
    console.log(loginId.value,loginPw.value)
    if (!loginId.value.trim() || !loginPw.value.trim()) {
        alert("빈칸이 없도록 입력해주세요.");
    } else {
        const body = {
            userid: loginId.value,
            userpassword: loginPw.value,
        };

        login(
            body,
            ({ data }) => {
                console.log(data);
                setCookie('id', body.userid);
                closeLoginBtn();
            },
            (err) => {
                console.log(err);
            }
        )
    }
}
const logoutUser = () => {
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
            <button @click="logoutUser" id="logout" style="margin-left:5px">로그아웃</button>
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
                            <input v-model="signupName" id="name" name="name" type="text" placeholder="이름" />
                            <input v-model="signupRrn" id="rrn" name="rrn" type="text" placeholder="주민번호" />
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
                            <input v-model="loginPw" id="password-login"
                                name="password" type="password" placeholder="비밀번호" />
                            <button @click="loginUser" id="login-btn" type="button">로그인</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>