import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    store: null,
  }),
  persist: true,
  getters: {
    getToken: (state) => LocalStorage.getItem("Token") || state.token,
    currentUser: (state) => state.user,
    currentStore: (state) => LocalStorage.getItem("Store") || state.store,
  },
  actions: {
    loginUser(token, user) {
      this.token = token;
      this.user = user;
      LocalStorage.set("Token", token);
    },
    setStore(store) {
      this.store = store;
      LocalStorage.set("Store", store);
    },
    clearUser() {
      this.user = null;
      this.token = null;
      LocalStorage.clear();
    },
  },
});
