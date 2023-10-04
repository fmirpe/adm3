import { api } from "src/boot/axios";

export function getPaymentTypes() {
  return api.get(`/collections/paymenttype/records`);
}

export function getPaymentType(id) {
  return api.get(`/collections/paymenttype/records/${id}`);
}

export function createPaymentType(obj) {
  return api.post(`/collections/paymenttype/records`, obj);
}

export function updatePaymentType(id, obj) {
  return api.patch(`/collections/paymenttype/records/${id}`, obj);
}
