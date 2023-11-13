<script setup>
import SearchView from "@/views/SearchView.vue";
import MyPlanListView from "./MyPlanListView.vue";
import TheTodoView from "./TheTodoView.vue";
// import fetchSido, { fetchGugun } from '@/assets/js/ajax/fetchSidoOrGun.js';
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const id = inject("id");
const isSearch = ref(true);
const isPlan = ref(false);
const isTodo = ref(false);
function searchPlaceClick() {
  if (isSearch.value) return;
  isSearch.value = true;
  isPlan.value = false;
  isTodo.value = false;
  // fetchSido('sido', '*00000000');
}

function myPlanClick() {
  if (isPlan.value) return;
  isSearch.value = false;
  isPlan.value = true;
  isTodo.value = false;
  // let body = { sign: "planList" };
  // body = JSON.stringify(body);
  // console.log(body);
  // let retMsg = await fetch("main", { method: "POST", body });
  // let json = await retMsg.json();

  // renderMyPlan(json.planList);
}
const router = useRouter();

function todoClick() {
  if (isTodo.value) return;
  isSearch.value = false;
  isPlan.value = false;
  isTodo.value = true;
  router.push({ name: 'todos' });
}
</script>

<template>
  <div>
    <div v-if="id">
    <nav>
      <button @click="searchPlaceClick" :class="{ navSelected: isSearch }">
        관광지 탐색
      </button>
        <button @click="myPlanClick" :class="{ navSelected: isPlan }">
          나의 여행계획
        </button>
        <button @click="todoClick" :class="{ navSelected: isTodo }">
          오늘의 할일
        </button>
      </nav>
      <div id="asideMain" class="InfoView"></div>
    </div>
    <div v-else>
      <nav>
        <button @click="searchPlaceClick" :class="{ navSelected: isSearch }">
        관광지 탐색
      </button>
      </nav>
    </div>
    <div v-if="isSearch">
      <SearchView />
    </div>
    <div v-if="isPlan">
      <MyPlanListView />
    </div>
    <div v-if="isTodo">
      <TheTodoView/>
    </div>
  </div>
</template>

<style scoped></style>
