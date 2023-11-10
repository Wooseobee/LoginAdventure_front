const $signupBtn = document.getElementById("signup");
const $signupModal = document.getElementById("signupModal");
const $closeSignupBtn = document.getElementById("closeSignupBtn");
console.log($signupBtn);

$signupBtn.onclick = function () {
  $signupModal.style.display = "block";
};

const $regist = document.getElementById("signup-submit");

$regist.onclick = async () => {
  console.log(234);
  console.log("regist");

  // 문서에서 id 로 input data 가져오기
  let id = document.getElementById("id").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let rrn = document.getElementById("rrn").value;

  // 입력값 검증
  if (!id.trim() || !password.trim() || !name.trim() || !rrn.trim()) {
    alert("빈칸이 없도록 입력해주세요.");
  } else {
    let body = { userid: id, userpassword: password, username: name, rrn };
    // body = JSON.stringify(body);
    console.log(body);
    body = JSON.stringify(body);

    let retMsg = await fetch("member/signup", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
    // location.reload(); // modal에서 메인으로 돌아가기

    if (retMsg.status == 200) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }
  }
  // $signupModal.style.display = 'none';
};

$closeSignupBtn.onclick = function () {
  $signupModal.style.display = "none";
};
/*
 * window.onclick = function(event) { if (event.target == modal) {
 * modal.style.display = "none"; } }
 */

const $loginBtn = document.getElementById("login");
const $loginModal = document.getElementById("loginModal");
const $closeLoginBtn = document.getElementById("closeLoginBtn");
$loginBtn.onclick = function () {
  $loginModal.style.display = "block";
};

$closeLoginBtn.onclick = function () {
  $loginModal.style.display = "none";
};

document.querySelector("#login-btn").addEventListener("click", async function () {
  // alert();

  const id = document.querySelector("#id-login").value;
  const pwd = document.querySelector("#password-login").value;

  let body = { userid: id, userpassword: pwd };
  body = JSON.stringify(body);
  console.log(body);
  let retMsg = await fetch("member/login", {
    method: "POST",
    credentials: "include",
    body,
    headers: { "Content-Type": "application/json" },
  });
  console.log(retMsg);
  retMsg = await retMsg.json();
  if (retMsg.msg == "로그인 성공") {
    // location.reload();
  } else {
    alert(retMsg.msg);
  }
});
