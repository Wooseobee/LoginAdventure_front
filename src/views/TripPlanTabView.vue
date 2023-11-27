<script setup>
import SearchView from "@/views/SearchView.vue";
import MyPlanListView from "./MyPlanListView.vue";
import TheTodoView from "./TheTodoView.vue";
import { useMemberStore } from "@/stores/member"
import {getCookie} from "@/assets/js/util/cookie";
import {userinfo} from "@/api/user";
import {provide, ref} from "vue";

const userStore = useMemberStore();
const username = ref('');
const email = ref('');

provide('username', username);
provide('email', email);

function searchPlaceClick() {
  if (userStore.isSearch) return;
  userStore.isSearch = true;
  userStore.isPlan = false;
  userStore.isMyInfo = false;
  // fetchSido('sido', '*00000000');
}

function myPlanClick() {
  if (userStore.isPlan) return;
  userStore.isSearch = false;
  userStore.isPlan = true;
  userStore.isMyInfo = false;
  // let body = { sign: "planList" };
  // body = JSON.stringify(body);
  // let retMsg = await fetch("main", { method: "POST", body });
  // let json = await retMsg.json();

  // renderMyPlan(json.planList);
}

const getUserinfo = () => {
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
        atk: atk
    }
    userinfo(
        body,
        ({data}) => {
            username.value = data.data.username;
            email.value = data.data.email;
        },
        (err) => {
            if (err.response.data.code === 15) {
                const res = userStore.reissueToken();
                if (res) {
                    getUserinfo();
                }
            }
        }
    )
}

function myInfoClick() {
  if (userStore.isMyInfo) return;
  userStore.isSearch = false;
  userStore.isPlan = false;
  userStore.isMyInfo = true;
  getUserinfo();
}
</script>

<template>
  <div>
    <div v-if="userStore.id">
    <nav>
      <button @click="searchPlaceClick" :class="{ navSelected: userStore.isSearch }">
        관광지 탐색
      </button>
        <button @click="myPlanClick" :class="{ navSelected: userStore.isPlan }">
          나의 여행계획
        </button>
        <button @click="myInfoClick" :class="{ navSelected: userStore.isMyInfo }">
          내 정보 조회
        </button>
      </nav>
      <div id="asideMain" class="InfoView"></div>
    </div>
    <div v-else>
      <nav>
        <button @click="searchPlaceClick" :class="{ navSelected: userStore.isSearch }">
        관광지 탐색
      </button>
      </nav>
    </div>
    <div v-if="userStore.isSearch">
      <SearchView />
    </div>
    <div v-if="userStore.isPlan">
      <MyPlanListView />
    </div>
    <div v-if="userStore.isMyInfo">
      <TheTodoView/>
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: small;
}
</style>
