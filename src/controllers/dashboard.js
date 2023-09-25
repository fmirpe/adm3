import { getCashs } from "src/api/cash";
import { getSales } from "src/api/pos";
import { date } from "quasar";

export async function totalCaja() {
  var result = (await getCashs()).data;
  var suma = 0;
  result.items.forEach((obj) => {
    suma += obj.type == "add" ? obj.amount : obj.amount * -1;
  });
  return suma;
}

export async function totalVentas() {
  const timeStamp = Date.now();
  const fini = date.formatDate(timeStamp, "YYYY-MM-DD 00:00:00");
  const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
  var result = (await getSales(`created > '${fini}'`, "")).data;
  var suma = 0;
  result.items.forEach((obj) => {
    suma += obj.total;
  });
  return suma;
}
