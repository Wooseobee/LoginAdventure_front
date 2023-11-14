<script setup>
import {ref, inject} from 'vue';
import { useMemberStore } from '@/stores/member'

const userStore = useMemberStore();

const titleStyle = ref({
    color: '#258fff',
    marginBottom: '20px',
    fontSize: '18px',
})

const planModalStyle = ref({
  display: 'none',
})

const showPlanModal = () => {
  planModalStyle.value.display = 'block';
}

const hidePlanModal = () => {
  planModalStyle.value.display = 'none';
}
</script>

<template>
  <!-- plan regist -->
  <div v-if="userStore.id">
    <button
      @click="showPlanModal"
      id="registPlanBtn"
      class="addPlanBtnContainer"
    >
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
  <!-- modal -->
  <div :style="planModalStyle" id="planRegistModal" class="modalWrap">
    <div id="modalBody" class="modalBody">
      <span @click="hidePlanModal" class="closeBtn">&times;</span>
      <div class="form">
        <h1 :style="titleStyle">여행계획 등록</h1>
        <form name="planRegist-form" class="planRegist-form">
          <input id="planTitle" type="text" placeholder="제목" />
          <textarea id="planContent" placeholder="내용" rows="5"></textarea>
          <button @click="hidePlanModal" id="planRegist-submit" type="button">
            등록
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
