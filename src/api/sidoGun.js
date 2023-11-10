import serviceKeyJong from "@/assets/js/key";
import { localAxios } from "@/utils/http-commons.js";

const local = localAxios;
const url =
  "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
  serviceKeyJong +
  "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

export default async function fetchSido() {
  return local.get(url).then(({ data }) => {
    return data.response.body.items.item;
  });
}
