import { api } from "src/boot/axios";

export function getCategories() {
  return api.get(`/collections/categories/records`);
}

export function getCategory(id) {
  return api.get(`/collections/categories/records/${id}`);
}

export function createCategory(obj) {
  return api.post(`/collections/categories/records`, obj);
}

export function updateCategory(id, obj) {
  return api.patch(`/collections/categories/records/${id}`, obj);
}

export function deleteCategory(id) {
  return api.delete(`/collections/categories/records/${id}`);
}
