import { api } from "src/boot/axios";

export function getCustomers(filter = "", expand = "") {
  var strurl = `/collections/customers/records?sort=-created`;
  if (filter != "") {
    strurl += `&filter=${encodeURIComponent(filter)}`;
  }
  if (expand != "") {
    strurl += `&expand=${encodeURIComponent(expand)}`;
  }
  return api.get(`${strurl}`);
}

export function getCustomer(id) {
  return api.get(`/collections/customers/records/${id}`);
}

export function createCustomer(obj) {
  return api.post(`/collections/customers/records`, obj);
}

export function updateCustomer(id, obj) {
  return api.patch(`/collections/customers/records/${id}`, obj);
}

export function deleteCustomer(id) {
  return api.delete(`/collections/customers/records/${id}`);
}
