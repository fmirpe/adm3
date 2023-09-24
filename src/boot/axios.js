import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://127.0.0.1:8090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  api.interceptors.request.use(
    function (config) {
      var token = LocalStorage.getItem("Token");
      if (config.url.includes("auth")) {
        config.headers = {
          Accept: "application/json",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        };
      } else {
        config.headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Origin": "*",
        };
      }

      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for API calls
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      console.log(error);
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        router.push("/Login");
      }
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
