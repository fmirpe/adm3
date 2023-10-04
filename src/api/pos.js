import { api } from "src/boot/axios";

export function getSales(
  filter = "",
  expand = "",
  skipTotal = false,
  page = 1,
  perPage = 30
) {
  var strurl = `/collections/sales/records?sort=-created&page=${page}&perPage=${perPage}&skipTotal=${skipTotal}`;
  if (filter != "") {
    strurl += `&filter=${encodeURIComponent(filter)}`;
  }
  if (expand != "") {
    strurl += `&expand=${encodeURIComponent(expand)}`;
  }

  return api.get(`${strurl}`);
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
