<script setup>
// import '@/assets/js/header.js'
import SearchView from "@/views/SearchView.vue";
import LoginView from "@/views/LoginView.vue";
import SearchBoxView from "../views/SearchBoxView.vue";
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
						<LoginView/>
					</div>
				</div>
			</div>
		</div>
		<SearchBoxView/>
		<div class="Info">
			<nav>
				<button id="searchPlaceBtn">관광지 탐색</button>
				<button id="myPlanBtn">나의 여행계획</button>
			</nav>

			<div id="asideMain" class="InfoView"></div>
			<button id="registPlanBtn" class="addPlanBtnContainer">
				<svg class="addPlanBtn" fill="#258fff"
					xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
					<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
				</svg>
			</button>
			<SearchView/>
			<footer class="Footer">
				<span>공지사항</span>
			</footer>

		</div>
		<div class="bar"></div>

		<main class="View">
			<div id="map" style="width: 100%; height: 100%">
			</div>
		</main>

		<!-- 여행계획 등록 Modal -->
		<div id="planRegistModal" class="modalWrap">
			<div id="modalBody" class="modalBody">
				<span id="closePlanRegistBtn" class="closeBtn">&times;</span>
				<div class="form">
					<h1 style="margin-bottom: 20px;font-size: 18px;">여행계획 등록</h1>
					<form name="planRegist-form" class="planRegist-form">
						<input id="planTitle" type="text" placeholder="제목" /> <textarea id="planContent" placeholder="내용"
							rows="5"></textarea>
						<button id="planRegist-submit" type="button">등록</button>
					</form>
				</div>
			</div>
		</div>

		<!-- 여행계획 view Modal -->
		<div id="planViewModal" class="modalWrap">
			<div id="modalBody" class="modalBody">
				<span id="closePlanViewModalBtn" class="closeBtn">&times;</span>
				<div class="planViewBody">

				</div>

			</div>
		</div>


	</div>
</template>

<style scoped></style>