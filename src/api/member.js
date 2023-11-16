import { localAxios } from "@/utils/http-commons";

const local = localAxios;

function login(param, success, fail) {
  local.post(`/user/jwtlogin`, param).then(success).catch(fail);
}

export { login };
