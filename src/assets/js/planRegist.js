
const $registPlanBtn = document.getElementById('registPlanBtn');
const $planRegistModal = document.getElementById('planRegistModal');
const $closePlanRegistBtn = document.getElementById('closePlanRegistBtn');


  $registPlanBtn.onclick = function() {
     console.log(planRegistModal)
      $planRegistModal.style.display = 'block';
    
}
  
  const $regist = document.getElementById('planRegist-submit');
  $regist.addEventListener("click",async()=>{
	  console.log("asdlfnawge");
	  let title = document.getElementById("planTitle").value;
      let content = document.getElementById("planContent").value;
	  let body = { title,content}
		body = JSON.stringify(body);
		console.log(body);
		let retMsg = await fetch("plan/regist", {method:'POST', body});
		if(retMsg.status==200){
			alert("등록 완료");
		}else{
			alert("등록 실패");
		}
   
  });  
  
$closePlanRegistBtn.onclick = function() {
    $planRegistModal.style.display = 'none';
}









