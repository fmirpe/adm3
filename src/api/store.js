import { api } from "src/boot/axios";

export function updateStore(id, obj) {
  return api.patch(`/collections/stores/records/${id}`, obj);
}

export function getStore() {
  return api.get(`/collections/stores/records`);
}
