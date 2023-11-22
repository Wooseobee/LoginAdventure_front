import { ref } from "vue";
import { defineStore } from "pinia";
import {getCookie, deleteCookie, setCookie} from "@/assets/js/util/cookie.js";
import {height, signup, logout, reissue} from "@/api/user.js";

export const useMemberStore = defineStore("member", () => {
  const id = ref("");
  const cookieId = getCookie("id");
  const sessionId = sessionStorage.getItem("id");
  const isSearch = ref(true);
  const isPlan = ref(false);
  const isMyInfo = ref(false);
  const rememberMe = ref(false);
  const uuid = ref("");
  const modulus = ref("");
  const exponent = ref("");

  if (cookieId) {
    id.value = cookieId;
  }

  if (sessionId) {
    id.value = sessionId;
  }

  const heightUser = async function () {
    await height(
      ({ data }) => {
        uuid.value = data.data.uuid;
        modulus.value = data.data.modulus;
        exponent.value = data.data.exponent;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const signupUser = function (body) {
    signup(
      body,
      ({ data }) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const logoutUser = function (body, headers) {
    console.log(body);
    console.log(headers);
    logout(
      body,
      headers,
      ({ data }) => {
        if (!rememberMe.value) {
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("atk");
          sessionStorage.removeItem("rtk");
        } else {
          deleteCookie("id");
          deleteCookie("atk");
          deleteCookie("rtk");
        }
        id.value = "";
        isSearch.value = true;
        isPlan.value = false;
        isMyInfo.value = false;
      },
      (err) => {
        console.log("err");
      }
    );
  };

  const reissueToken = async () => {
    let body;
    if (!rememberMe.value) {
      body = {
        userid: sessionStorage.getItem('id'),
        rtk: sessionStorage.getItem("rtk"),
      }
    } else {
      body = {
        userid: getCookie('id'),
        rtk: getCookie("rtk"),
      }
    }
    console.log("reissueToken")
    return await reissue(
        body,
        ({data}) => {
          if (!rememberMe.value) {
            sessionStorage.setItem('atk', data.data.atk);
          } else {
            setCookie('atk', data.data.atk);
          }
          return true;
        },
        (err) => {
          if (!rememberMe.value) {
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("atk");
            sessionStorage.removeItem("rtk");
          } else {
            deleteCookie("id");
            deleteCookie("atk");
            deleteCookie("rtk");
          }
          id.value = "";
          isSearch.value = true;
          isPlan.value = false;
          isMyInfo.value = false;
          return false;
        }
    )
  }

  return {
    id,
    cookieId,
    isSearch,
    isPlan,
    isMyInfo,
    rememberMe,
    heightUser,
    signupUser,
    logoutUser,
    uuid,
    modulus,
    exponent,
    reissueToken,
  };
});
