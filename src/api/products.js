import { api } from "src/boot/axios";

export function getProducts() {
  return api.get(`/collections/products/records`);
}

export function getProduct(id) {
  return api.get(`/collections/products/records/${id}`);
}

export function createProduct(obj) {
  return api.post(`/collections/products/records`, obj);
}

export function updateProduct(id, obj) {
  return api.patch(`/collections/products/records/${id}`, obj);
}

export function deleteProduct(id) {
  return api.delete(`/collections/products/records/${id}`);
}
