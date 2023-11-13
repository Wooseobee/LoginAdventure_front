import { ref } from "vue";
import { defineStore } from "pinia";
import { getCookie, setCookie, deleteCookie } from "@/assets/js/util/cookie.js";
import { signup, login, logout } from "@/api/user.js";

export const useMemberStore = defineStore("member", () => {
  const id = ref("");
  const cookieId = getCookie("id");
  const isSearch = ref(true);
  const isPlan = ref(false);
  const isTodo = ref(false);
  if (cookieId) {
    id.value = cookieId;
  }

  const signupMember = function (body) {
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

  const loginMember = function (body) {
    login(
      body,
      ({ data }) => {
        console.log(data);
        setCookie("id", body.userid);
        id.value = body.userid;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const logoutMember = function () {
    logout(
      ({ data }) => {
        console.log(data);
        id.value = "";
        deleteCookie("id");
        isSearch.value = true;
        isPlan.value = false;
        isTodo.value = false;
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return { id, cookieId, isSearch, isPlan, isTodo, signupMember, loginMember, logoutMember };
});
