import { localAxios } from "@/utils/http-commons";

const local = localAxios;

function login(param, success, fail) {
    local
        .post(`/user/login`, { params: param })
        .then(success)
        .catch(fail);
}

function logout(articleno, success, fail) {
    local
        .get(`/user/logout`)
        .then(success)
        .catch(fail);
}

export {login, logout}