<script setup>
import SearchView from "@/views/SearchView.vue";
import MyPlanListView from "./MyPlanListView.vue";
import TheTodoView from "./TheTodoView.vue";
// import fetchSido, { fetchGugun } from '@/assets/js/ajax/fetchSidoOrGun.js';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member"

const userStore = useMemberStore();

function searchPlaceClick() {
  if (userStore.isSearch) return;
  userStore.isSearch = true;
  userStore.isPlan = false;
  userStore.isTodo = false;
  // fetchSido('sido', '*00000000');
}

function myPlanClick() {
  if (userStore.isPlan) return;
  userStore.isSearch = false;
  userStore.isPlan = true;
  userStore.isTodo = false;
  // let body = { sign: "planList" };
  // body = JSON.stringify(body);
  // console.log(body);
  // let retMsg = await fetch("main", { method: "POST", body });
  // let json = await retMsg.json();

  // renderMyPlan(json.planList);
}
const router = useRouter();

function todoClick() {
  if (userStore.isTodo) return;
  userStore.isSearch = false;
  userStore.isPlan = false;
  userStore.isTodo = true;
  router.push({ name: 'todos' });
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
        <button @click="todoClick" :class="{ navSelected: userStore.isTodo }">
          오늘의 할일
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
    <div v-if="userStore.isTodo">
      <TheTodoView/>
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: small;
}
</style>
