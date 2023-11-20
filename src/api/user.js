import { localAxios } from "@/utils/http-commons.js";

const local = localAxios;

function height(success, fail) {
  local.get(`/user/height`).then(success).catch(fail);
}

function signup(body, success, fail) {
  local.post(`/user/signup`, body).then(success).catch(fail);
}

function login(body, success, fail) {
  local.post(`/user/login`, body).then(success).catch(fail);
}

function logout(success, fail) {
  local.get(`/user/logout`).then(success).catch(fail);
}

export { height, signup, login, logout };
