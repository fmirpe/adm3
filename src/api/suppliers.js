import { api } from "src/boot/axios";

export function getSuppliers() {
  return api.get(`/collections/suppliers/records`);
}

export function getSupplier(id) {
  return api.get(`/collections/suppliers/records/${id}`);
}

export function createSupplier(obj) {
  return api.post(`/collections/suppliers/records`, obj);
}

export function updateSupplier(id, obj) {
  return api.patch(`/collections/suppliers/records/${id}`, obj);
}

export function deleteSupplier(id) {
  return api.delete(`/collections/suppliers/records/${id}`);
}
