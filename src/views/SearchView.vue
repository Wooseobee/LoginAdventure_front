<script setup>
import { ref, onMounted } from 'vue';
import fetchsido, { fetchGugun } from '@/api/sidoGun.js'
// const sido = ref("");
const sidos = ref([]);
const guguns = ref([]);

onMounted(async () => {
  sidos.value = await fetchsido();
})

</script>

<template>
  <div class="container">
    <div class="AreaSelect">
      <div class="Select">
        <select id="sido">
          <option value="">시도선택</option>
          <option v-for="sido in sidos" :key="sido.code" :value="sido.code">{{ sido.name }}</option>
        </select>
      </div>
      <div class="Select">
        <select id="gugun">
          <option value="">구군선택</option>
        </select>
      </div>
    </div>
    <div class="SearchFilter">
      <div class="SearchFilterRow">
        <button value="12" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-suitcase" style="color: #fe8c52"></i></div>
          <span>관광지</span>
        </button>
        <button value="32" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-hotel" style="color: #fe8c52"></i></div>
          <span> 숙박 </span>
        </button>
        <button value="39" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-utensils" style="color: #d971db"></i></div>
          <span> 음식점 </span>
        </button>
        <button value="14" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color: #5e9bf3"></i></div>
          <span> 문화시설 </span>
        </button>
      </div>
      <div class="SearchFilterRow">
        <button value="15" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color: #03c75a"></i></div>
          <span> 공연 </span>
        </button>
        <button value="25" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-map-signs" style="color: #ffb21f"></i></div>
          <span>여행코스</span>
        </button>
        <button value="38" class="filterIcon">
          <div class="FilterIcon"><i class="fas fa-shopping-bag" style="color: #ffb21f"></i></div>
          <span>쇼핑</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
