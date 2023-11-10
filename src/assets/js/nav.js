// import fetchSido, { fetchGugun } from "./ajax/fetchSidoOrGun.js";
// // import { getCookie } from "./util/cookie.js";

// const $asideMain = document.getElementById("asideMain");
// fetchSido("sido");
// function renderSearchPlace() {
//   $asideMain.innerHTML = `
//     <h2>관광지 탐색</h2>
//     <div class="AreaSelect" >
//         <div class="Select" >
//             <select id="sido" >
//                 <option   value="">
//                     시도선택
//                 </option>
//             </select>
//         </div>
//         <div class="Select" >
//             <select id="gugun" >
//                 <option   value="">
//                     구군선택
//                 </option>
//             </select>
//         </div>
//     </div>
//     <div class="SearchFilter">
//         <div class="SearchFilterRow">
//             <button value="12" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-suitcase" style="color:#FE8C52"></i></div>
//                 <span>관광지</span>
//             </button>
//             <button value="32" class="filterIcon">
//                 <div class="FilterIcon"> <i class="fas fa-hotel" style="color:#FE8C52"></i></div>
//                 <span>
//                     숙박
//                 </span>
//             </button>
//             <button value="39" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-utensils" style="color:#D971DB"></i></div>
//                 <span>
//                     음식점
//                 </span>
//             </button>
//             <button value="14" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color:#5E9BF3"></i></div>
//                 <span>
//                     문화시설
//                 </span>
//             </button>
//         </div>
//         <div  class="SearchFilterRow">
//             <button value="15" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-ticket-alt" style="color:#03C75A ;"></i></div>
//                 <span>
                  
//                     공연
//                 </span>
//             </button>
//             <button value="25" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-map-signs" style="color:#FFB21F"></i></div>
//                 <span>여행코스</span>
//             </button>
//             <button value="38" class="filterIcon">
//                 <div class="FilterIcon"><i class="fas fa-shopping-bag" style="color:#FFB21F"></i></div>
//                 <span>쇼핑</span>
//             </button>
//         </div>
//     </div>
//     `;
//   const $sido = document.querySelector("#sido");
//   $sido.addEventListener("change", () => fetchGugun($sido.value));
// }

// const dummyData = [
//   { id: 0, title: "부산여행", userid: "yyyy", content: "즐거운 여행~" },
//   { id: 1, title: "부산여행", userid: "yyyy", content: "즐거운 여행~" },
// ];
// const onPlanClick = async (e) => {
//   console.log(e.currentTarget.id);

//   const $planViewModal = document.getElementById("planViewModal");
//   const $closePlanViewModalBtn = document.getElementById("closePlanViewModalBtn");
//   $planViewModal.style.display = "block";
//   $closePlanViewModalBtn.onclick = function () {
//     $planViewModal.style.display = "none";
//   };
//   let body = { sign: "planView", contentid: e.currentTarget.id };
//   body = JSON.stringify(body);
//   console.log(body);
//   let retMsg = await fetch("main", { method: "POST", body });
//   let json = await retMsg.json();
//   console.log(json);
//   const id = getCookie("id");

//   if (id !== json.userid) {
//     const $planViewBody = document.querySelector(".planViewBody");
//     $planViewBody.innerHTML = `
//                  <div class="planHeader">
//               <h1>${json.title}</h1>
//               <div>
//                   <span>${json.userid} 님</span>
//                   <span>${json.timestamp.split(" ")[0]}</span>
//               </div>
//           </div>
//           <p class="tripContent">
//               ${json.content}
//           </p>
              
//               `;
//   } else {
//     const $planViewBody = document.querySelector(".planViewBody");
//     $planViewBody.innerHTML = `
//                  <div class="planHeader">
//               <h1>${json.title}</h1>
//               <div>
//                   <span>${json.userid} 님</span>
//                   <span>${json.timestamp.split(" ")[0]}</span>
//               </div>
//               <button id="planRegistBtn" name=${json.contentid}>🗑️</button>
//           </div>
//           <p class="tripContent">
//               ${json.content}
//           </p>
//               <button class="edit-btn"> 수정 </button>
//               `;
//   }

//   const $planRegistBtn = document.getElementById("planRegistBtn");
//   $planRegistBtn.addEventListener("click", async (e) => {
//     let body = { sign: "planDelete", contentid: e.currentTarget.name };
//     body = JSON.stringify(body);
//     console.log(body);

//     let retMsg = await fetch("main", { method: "POST", body });

//     if (retMsg.status == 200) {
//       location.reload();
//     } else {
//       alert("오류발생");
//     }
//   });
// };

// function renderMyPlan(data) {
//   let innerHTML = `
// 	  <h2>나의 여행계획 목록</h2>
//       <ul class="planList">
// 	`;

//   data.forEach(({ contentid, title, userid, content }) => {
//     innerHTML += `<li class="planLi" id=${contentid}  >
//         <div class="planTitle">
      
//             <span class="dummyIcon">📌</span>
          
//            <span >${title}</span>
//         </div>
//         <div>
//            <span class="planTerm">${userid}</span>
//            <p class="planText">${content}</p>
//         </div>
//       </li>
//     	`;
//   });

//   innerHTML += `
// 		   </ul>
// 		`;
//   $asideMain.innerHTML = innerHTML;
//   document
//     .querySelectorAll(".planLi")
//     .forEach((li) => li.addEventListener("click", (e) => onPlanClick(e)));
// }

// export default function detectNavChange() {
//   const $searchPlaceBtn = document.getElementById("searchPlaceBtn");
//   const $myPlanBtn = document.getElementById("myPlanBtn");
//   $searchPlaceBtn.classList.add("navSelected");
//   renderSearchPlace();
//   $searchPlaceBtn.onclick = () => {
//     if ($searchPlaceBtn.classList.contains("navSelected")) return;
//     $searchPlaceBtn.classList.add("navSelected");
//     $myPlanBtn.classList.remove("navSelected");
//     renderSearchPlace();
//     fetchSido("sido", "*00000000");
//   };
//   $myPlanBtn.onclick = async () => {
//     if ($myPlanBtn.classList.contains("navSelected")) return;
//     $myPlanBtn.classList.add("navSelected");
//     $searchPlaceBtn.classList.remove("navSelected");
//     let body = { sign: "planList" };
//     body = JSON.stringify(body);
//     console.log(body);
//     let retMsg = await fetch("main", { method: "POST", body });
//     let json = await retMsg.json();

//     renderMyPlan(json.planList);
//   };
// }

// detectNavChange();
