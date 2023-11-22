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

function logout(body, headers, success, fail) {
  local.post(`/user/logout`, body).then(success).catch(fail);
}

function userinfo(body, success, fail) {
  local.post(`/user/userinfo`, body).then(success).catch(fail);
}

function uniqueCheck(body, success, fail) {
  local.post(`/user/checkId`, body).then(success).catch(fail);
}

function uniqueCheckEmail(body, success, fail) {
  local.post(`/user/checkEmail`, body).then(success).catch(fail);
}

function modify(body, success, fail) {
  local.post(`/user/modify`, body).then(success).catch(fail);
}

async function reissue(body, success, fail) {
  local.post(`/user/reissue`, body).then(success).catch(fail);
}

export { height, signup, login, logout, userinfo, uniqueCheck, modify, reissue, uniqueCheckEmail };
