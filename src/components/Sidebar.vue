<script setup>
  // import '@/assets/js/header.js'
  import LoginView from '@/views/LoginView.vue';
  import SearchBoxView from '@/views/SearchBoxView.vue';
  import TripPlanTabView from '@/views/TripPlanTabView.vue';
</script>

<template>
  <div>
    <div class="IE6MIN">
      <div id="header" class="Header" role="banner">
        <div>
          <div class="Title">
            <a href="">EnjoyTrip</a>
          </div>
          <div id="user">
            <!--로그인 여부-->
            <LoginView />
          </div>
        </div>
        <SearchBoxView />
      </div>
    </div>
    <div class="Info">
      <TripPlanTabView />
      <footer class="Footer">
        <span>공지사항</span>
      </footer>
    </div>
    <div class="bar"></div>

    <main class="View">
      <div id="map" style="width: 100%; height: 100%"></div>
    </main>

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

    <!-- 여행계획 view Modal -->
    <div id="planViewModal" class="modalWrap">
      <div id="modalBody" class="modalBody">
        <span id="closePlanViewModalBtn" class="closeBtn">&times;</span>
        <div class="planViewBody"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
