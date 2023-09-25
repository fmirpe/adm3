import { api } from "src/boot/axios";

export function getCashs() {
  return api.get(`/collections/cash/records`);
}

export function getCash(id) {
  return api.get(`/collections/cash/records/${id}`);
}

export function createCash(obj) {
  return api.post(`/collections/cash/records`, obj);
}

export function updateCash(id, obj) {
  return api.patch(`/collections/cash/records/${id}`, obj);
}

export function deleteCash(id) {
  return api.delete(`/collections/cash/records/${id}`);
}
