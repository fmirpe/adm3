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

export function updateSale(id, obj) {
  return api.patch(`/collections/sales/records/${id}`, obj);
}

export function deleteSale(id) {
  return api.delete(`/collections/sales/records/${id}`);
}

export function createSaleDetail(obj) {
  return api.post(`/collections/sales_detail/records`, obj);
}

export function getSaleDetailt(idsale) {
  return api.get(
    `/collections/sales_detail/records?sort=created&filter=id_sales=${idsale}`
  );
}

export function getSalesPay(
  filter = "",
  expand = "",
  skipTotal = false,
  page = 1,
  perPage = 30
) {
  var strurl = `/collections/sales_pay/records?sort=-created&page=${page}&perPage=${perPage}&skipTotal=${skipTotal}`;
  if (filter != "") {
    strurl += `&filter=${encodeURIComponent(filter)}`;
  }
  if (expand != "") {
    strurl += `&expand=${encodeURIComponent(expand)}`;
  }
  return api.get(`${strurl}`);
}

export function createSalesPay(obj) {
  return api.post(`/collections/sales_pay/records`, obj);
}
