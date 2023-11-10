import { localAxios } from "@/utils/http-commons.js";

const local = localAxios;

function signup(body, success, fail) {
  local.post(`/member/signup`, body).then(success).catch(fail);
}

function login(body, success, fail) {
  local.post(`/member/login`, body).then(success).catch(fail);
}

function logout(success, fail) {
  local.get(`/member/logout`).then(success).catch(fail);
}

export { signup, login, logout };
