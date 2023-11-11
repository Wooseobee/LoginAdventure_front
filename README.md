# Vue.js 프로젝트 

## 프로젝트 내용
(이전) <a href="https://lab.ssafy.com/s10/a19/09_springboot/pair06_leedongjae_parkjongwoo">이동재, 박종우 스프링 프로젝트</a>의 HTML과 Vanilla Javascript로 구현한 프론트엔드에 Vue.js 프레임워크를 적용
1. 한 html 작성된 DOM을 기능/부분 별로 Vue Component 형태로 분할
2. document.getElementById로 적용한 Javascript를 Vue.js Composition내 script 태그 안으로 이동
2. fetch로 구현한 Ajax 대신 Axios 활용


## 구현 내용

### 1. Vue Compoenent로 변경
#### Sidebar.vue
```javascript
<script setup>
// import '@/assets/js/header.js'
import LoginView from "@/views/LoginView.vue";
import SearchBoxView from "@/views/SearchBoxView.vue";
import TripPlanTabView from "@/views/TripPlanTabView.vue";
import PlanRegistView from "@/views/PlanRegistView.vue";
</script>

<template>
  <div>
    <div class="IE6MIN">
      <div id="header" class="Header" role="banner">
        <div>
          <div class="Title">
            <a href="">EnjoyTrip</a>
          </div>
          <div id="user">
            <!--로그인 여부-->
            <LoginView />
          </div>
        </div>
        <PlanRegistView />
        <SearchBoxView />
      </div>
    </div>
    <div class="Info">
      <TripPlanTabView />
      <footer class="Footer">
        <span>공지사항</span>
      </footer>
    </div>
    <div class="bar"></div>

    <main class="View">
      <div id="map" style="width: 100%; height: 100%"></div>
    </main>

  </div>
</template>

<style scoped></style>
```

### 2. 동적 javascript코드 Vue component내로 이동
document.getElementById로...

#### LoginView.vue
```javascript
<script setup>
import { ref, inject } from 'vue';
import { setCookie, deleteCookie } from '@/assets/js/util/cookie.js';
import { signup, login, logout } from '@/api/user.js';
const id = inject('id');

const signupId = ref('');
const signupPw = ref('');
const signupName = ref('');
const signupRrn = ref('');

const styleLoginModal = ref({
    display: 'none',
});

const loginModal = () => {
    styleLoginModal.value.display = 'block';
};

const closeLoginBtn = () => {
    styleLoginModal.value.display = 'none';
};

const styleSignupModal = ref({
    display: 'none',
});

const signupModal = () => {
    styleSignupModal.value.display = 'block';
};

const closeSignupBtn = () => {
    styleSignupModal.value.display = 'none';
};

const signupUser = () => {
    if (
        !signupId.value.trim() ||
        !signupPw.value.trim() ||
        !signupName.value.trim() ||
        !signupRrn.value.trim()
    ) {
        alert('빈칸이 없도록 입력해주세요.');
    } else {
        const body = {
            userid: signupId.value,
            userpassword: signupPw.value,
            username: signupName.value,
            rrn: signupRrn.value,
        };

        signup(
            body,
            ({ data }) => {
                console.log(data);
                closeSignupBtn();
            },
            (err) => {
                console.log(err);
            }
        );
    }
};

const loginId = ref('');
const loginPw = ref('');
const loginUser = () => {
    if (!loginId.value.trim() || !loginPw.value.trim()) {
        alert('빈칸이 없도록 입력해주세요.');
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
                id.value = body.userid;
                closeLoginBtn();
            },
            (err) => {
                console.log(err);
            }
        );
    }
};
const logoutUser = () => {
    if (!id) {
        alert('로그인부터 해주세요.');
    } else {
        logout(
            ({ data }) => {
                console.log(data);
                id.value = '';
                deleteCookie('id');
            },
            (err) => {
                console.log(err);
            }
        );
    }
};
</script>

<template>
    <div>
        <div v-if="!id">
            <button @click="signupModal" type="button" id="signup">회원가입</button>
            <button @click="loginModal" type="button" id="login">로그인</button>
        </div>
        <div v-else>
            <span>{{ id }} 님</span>
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
                            <input v-model="loginPw" id="password-login" name="password" type="password"
                                placeholder="비밀번호" />
                            <button @click="loginUser" id="login-btn" type="button">로그인</button>
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
</style>

```

### 프로젝트 소감

<b>신우섭</b>

> 작성중...

<br>

<b>박종우</b>


> 작성중...

<br>
