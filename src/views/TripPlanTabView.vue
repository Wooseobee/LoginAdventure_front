<script setup>
import SearchView from "@/views/SearchView.vue";
import MyPlanListView from "./MyPlanListView.vue";
// import fetchSido, { fetchGugun } from '@/assets/js/ajax/fetchSidoOrGun.js';
import { ref, inject } from "vue";


const id = inject('id');
const isSearch = ref(true);
function searchPlaceClick() {
  if (isSearch.value) return;
  isSearch.value = true;
  // fetchSido('sido', '*00000000');
}

const planModalStyle = ref({
  display: 'none',
})

const showPlanModal = () => {
  planModalStyle.value.display = 'block';
}

const hidePlanModal = () => {
  planModalStyle.value.display = 'none';
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
    <!-- <PlanRegistModal :style="stylePlanModal" /> -->
    <div v-if="id">
      <button @click="showPlanModal" id="registPlanBtn" class="addPlanBtnContainer">
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
    <div :style=planModalStyle id="planRegistModal" class="modalWrap">
    <div id="modalBody" class="modalBody">
      <span @click="hidePlanModal" class="closeBtn">&times;</span>
      <div class="form">
        <h1 style="margin-bottom: 20px; font-size: 18px">여행계획 등록</h1>
        <form name="planRegist-form" class="planRegist-form">
          <input id="planTitle" type="text" placeholder="제목" />
          <textarea id="planContent" placeholder="내용" rows="5"></textarea>
          <button @click="hidePlanModal" id="planRegist-submit" type="button">등록</button>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped></style>
