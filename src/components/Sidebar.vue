<script setup>
// import '@/assets/js/header.js'
import LoginView from "@/views/LoginView.vue";
import SearchBoxView from "@/views/SearchBoxView.vue";
import TripPlanTabView from "@/views/TripPlanTabView.vue";
import PlanRegistView from "@/views/PlanRegistView.vue";
</script>

<template>
  <div>
    <div class="IE6MIN">
      <div id="header" class="Header" role="banner">
        <div>
          <div class="Title">
            <a href="">EnjoyTrip</a>
          </div>
          <router-link :to="{name : 'jwtlogin'}">JWT로그인</router-link>
          <a href="https://kauth.kakao.com/oauth/authorize?client_id=0fcbc84f0fab706f3524ed52931c49d4&redirect_uri=http://localhost:8080/user/kakaologin&response_type=code">
            <img src="@/assets/kakao_login_small.png">
          </a>
          <div id="user">
            <!--로그인 여부-->
            <LoginView />
          </div>
        </div>
        <PlanRegistView />
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

    <!-- <main class="View">
      <div id="map" style="width: 100%; height: 100%"></div>
    </main> -->

  </div>
</template>

<style scoped></style>
