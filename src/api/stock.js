import { api } from "src/boot/axios";

export function getStocks(filter = "", expand = "") {
  var strurl = `/collections/stocks/records?sort=-created`;
  if (filter != "") {
    strurl += `&filter=(${encodeURIComponent(filter)})`;
  }
  if (expand != "") {
    strurl += `&expand=${encodeURIComponent(expand)}`;
  }

  return api.get(`${strurl}`);
}

export function getStock(id) {
  return api.get(`/collections/stocks/records/${id}`);
}

export function createStock(obj) {
  return api.post(`/collections/stocks/records`, obj);
}

export function updateStock(id, obj) {
  return api.patch(`/collections/stocks/records/${id}`, obj);
}

export function deleteStock(id) {
  return api.delete(`/collections/stocks/records/${id}`);
}
