import { ref } from "vue";
import { defineStore } from "pinia";
import { getCookie, setCookie, deleteCookie } from "@/assets/js/util/cookie.js";
import { height, signup, login, logout } from "@/api/user.js";

export const useMemberStore = defineStore("member", () => {
  const id = ref("");
  const cookieId = getCookie("id");
  const isSearch = ref(true);
  const isPlan = ref(false);
  const isTodo = ref(false);
  const uuid = ref("");
  const modulus = ref("");
  const exponent = ref("");
  if (cookieId) {
    id.value = cookieId;
  }

  const heightUser = async function () {
    await height(
      ({ data }) => {
        uuid.value = data.data.uuid;
        modulus.value = data.modulus;
        exponent.value = data.exponent;
        console.log("됐어");
        console.log(data);
        console.log(uuid.value);
      },
      (err) => {
        console.log(err);
      }
    );
  };

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
  return {
    id,
    cookieId,
    isSearch,
    isPlan,
    isTodo,
    heightUser,
    signupMember,
    logoutMember,
    uuid,
    modulus,
    exponent,
  };
});
