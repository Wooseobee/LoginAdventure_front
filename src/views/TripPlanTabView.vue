<script setup>
  import SearchView from '@/views/SearchView.vue';
  import MyPlanListView from './MyPlanListView.vue';
  import fetchSido, { fetchGugun } from '@/assets/js/ajax/fetchSidoOrGun.js';
  import { ref } from 'vue';

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
    <nav>
      <button @click="searchPlaceClick" :class="{ navSelected: isSearch }">관광지 탐색</button>
      <button @click="myPlanClick" :class="{ navSelected: !isSearch }">나의 여행계획</button>
    </nav>
    <div id="asideMain" class="InfoView"></div>
    <div v-if="isSearch">
      <SearchView />
    </div>
    <div v-else>
      <MyPlanListView />
    </div>
    <button id="registPlanBtn" class="addPlanBtnContainer">
      <svg
        class="addPlanBtn"
        fill="#258fff"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
