import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import { ref } from "vue";

export const useUserStore = defineStore(
  "geeker-user",
  () => {
    const token = ref("");
    const userInfo = ref({ name: "Geeker" });
    // Set Token
    function setToken(newToken: string): void {
      token.value = newToken;
    }
    // Set setUserInfo
    function setUserInfo(newUserInfo: UserState["userInfo"]) {
      userInfo.value = newUserInfo;
    }

    return { token, userInfo, setToken, setUserInfo };
  },
  { persist: piniaPersistConfig("geeker-user") }
);
