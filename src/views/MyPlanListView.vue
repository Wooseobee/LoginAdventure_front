<script setup></script>

<template>
  <div>
    my plan

    <h2>나의 여행계획 목록</h2>
    <ul class="planList">
      <li class="planLi" id="${contentid}">
        <div class="planTitle">
          <span class="dummyIcon">📌</span>

          <span>title</span>
        </div>
        <div>
          <span class="planTerm">userid</span>
          <p class="planText">content</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
