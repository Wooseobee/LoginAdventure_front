<script setup></script>

<template>
  <!-- 여행계획 등록 Modal -->
  <div id="planRegistModal" class="modalWrap">
    <div id="modalBody" class="modalBody">
      <span id="closePlanRegistBtn" class="closeBtn">&times;</span>
      <div class="form">
        <h1 style="margin-bottom: 20px; font-size: 18px">여행계획 등록</h1>
        <form name="planRegist-form" class="planRegist-form">
          <input id="planTitle" type="text" placeholder="제목" />
          <textarea id="planContent" placeholder="내용" rows="5"></textarea>
          <button id="planRegist-submit" type="button">등록</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
