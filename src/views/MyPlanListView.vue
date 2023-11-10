<script setup>
  import { ref, onMounted } from 'vue';
  import { planList } from '@/api/plan';

  const plans = ref([
    { title: 'plan1', userid: 'jongwoo', content: 'test1' },
    { title: 'plan2', userid: 'jongwoo', content: 'test2' },
    { title: 'plan3', userid: 'jongwoo', content: 'test3' },
  ]);
</script>

<template>
  <div>
    <ul class="planList">
      <li v-for="plan in plans" :key="plan.contentid" class="planLi" id="${contentid}">
        <div class="planTitle">
          <span class="dummyIcon">📌</span>

          <span>{{ plan.title }}</span>
        </div>
        <div>
          <span class="planTerm">{{ plan.userid }}</span>
          <p class="planText">{{ plan.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
