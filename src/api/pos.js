import { api } from "src/boot/axios";

export function getSales() {
  return api.get(`/collections/sales/records`);
}

export function getSale(id) {
  return api.get(`/collections/sales/records/${id}`);
}

export function createSale(obj) {
  return api.post(`/collections/sales/records`, obj);
}

export function createSaleDetail(obj) {
  return api.post(`/collections/sales_detail/records`, obj);
}
