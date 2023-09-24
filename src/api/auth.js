import { api } from "../boot/axios";

export function logIn(user, pass) {
  return api.post("/collections/users/auth-with-password", {
    identity: user,
    password: pass,
  });
}

export function register(user) {
  return api.post("/collections/users/records", user);
}

export function getStore(id) {
  return api.get(`/collections/stores/records/${id}`);
}
