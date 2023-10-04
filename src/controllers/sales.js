import { getSales } from "src/api/sales";
import { date } from "quasar";

export async function buscarVentas() {
  try {
    const timeStamp = Date.now();
    const fini = date.formatDate(timeStamp, "YYYY-MM-DD 00:00:00");
    const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
    var result = (
      await getSales(`created >= '${fini}'`, "id_customer,user", false, 1, 1000)
    ).data;
    return {
      type: "positive",
      message: "Correcto",
      data: result,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}

export async function todasVentas() {
  try {
    const timeStamp = Date.now();
    const fini = date.formatDate(timeStamp, "YYYY-MM-DD 00:00:00");
    const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
    var result = (await getSales(``, "id_customer,user", false, 1, 10000)).data;
    return {
      type: "positive",
      message: "Correcto",
      data: result,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}
