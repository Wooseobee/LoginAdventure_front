<script setup>
import SearchView from "@/views/SearchView.vue";
import MyPlanListView from "./MyPlanListView.vue";
// import fetchSido, { fetchGugun } from '@/assets/js/ajax/fetchSidoOrGun.js';
import { ref, inject } from "vue";

const id = inject("id");
const isSearch = ref(true);
function searchPlaceClick() {
  if (isSearch.value) return;
  isSearch.value = true;
  // fetchSido('sido', '*00000000');
}

function myPlanClick() {
  if (!isSearch.value) return;
  isSearch.value = false;
  // let body = { sign: "planList" };
  // body = JSON.stringify(body);
  // console.log(body);
  // let retMsg = await fetch("main", { method: "POST", body });
  // let json = await retMsg.json();

  // renderMyPlan(json.planList);
}
</script>

<template>
  <div>
    <div v-if="id">
    <nav>
      <button @click="searchPlaceClick" :class="{ navSelected: isSearch }">
        관광지 탐색
      </button>
        <button @click="myPlanClick" :class="{ navSelected: !isSearch }">
          나의 여행계획
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
    <div v-else>
      <MyPlanListView />
    </div>
  </div>
</template>

<style scoped></style>
