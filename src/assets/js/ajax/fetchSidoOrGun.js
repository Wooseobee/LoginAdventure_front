import serviceKeyDyne from "../key.js";
function addOption(selid, data) {
    let opt = ``;
    initOption(selid);
    switch (selid) {
      case "sido":
        let areas = data.response.body.items.item;
        opt += `<option value="">시도선택</option>`;
        areas.forEach(function (area) {
          opt += `
            <option value="${area.code}">${area.name}</option>
            `;
        });
        break;
      case "gugun":
       
          let guguns = data.response.body.items.item;
          opt += `<option value="">구군선택</option>`;
          guguns.forEach(function (area) {
            opt += `
              <option value="${area.code}">${area.name}</option>
              `;
          });
          break;
    }
    document.querySelector(`#${selid}`).innerHTML = opt;
    
  }

 export function initOption(selid) {
    let options = document.querySelector(`#${selid}`);
    options.length = 0;
    // let len = options.length;
    // for (let i = len - 1; i >= 0; i--) {
    //   options.remove(i);
    // }
  }


export  function fetchGugun(areaCode) {
    // index page 로딩 후 전국의 시도 설정.
  let areaUrl =
  "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
  serviceKeyDyne +
  `&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=${areaCode}`;

  // fetch(areaUrl, { method: "GET" }).then(function (response) { return response.json() }).then(function (data) { makeOption(data); });
  fetch(areaUrl, { method: "GET" })
  .then((response) => response.json())
  .then((data) => addOption("gugun",data));
}

export default function fetchSido(selid, regcode) {
      // index page 로딩 후 전국의 시도 설정.
    let areaUrl =
    "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
    serviceKeyDyne +
    "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

    // fetch(areaUrl, { method: "GET" }).then(function (response) { return response.json() }).then(function (data) { makeOption(data); });
    fetch(areaUrl, { method: "GET" })
    .then((response) => response.json())
    .then((data) => addOption(selid,data));
}






