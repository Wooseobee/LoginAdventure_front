import {getCookie,deleteCookie} from "./util/cookie.js"
function renderUser(){
	const id = getCookie("id");
  if (!id) {
      
       document.getElementById("user").innerHTML=`
         <button type="button" id="signup">회원가입</button>
         <button type="button" id="login">로그인</button>
       `
    }else{
    	
            document.getElementById("user").innerHTML=`
             <span>${id} 님</span>
             <button id="logout" style="margin-left:5px">로그아웃</button>
            `
            	document.querySelector("#logout").addEventListener('click', async function(){

            		let body = JSON.stringify(body);
            		console.log(body);
            		let retMsg = await fetch("member/logout", {method:'POST'});
            		
            		if(retMsg.status==200){
            			deleteCookie("id");
            			location.reload();
            		}else{
            			alert("로그아웃 실패");
            		}
                
            });
    }
}
renderUser();



