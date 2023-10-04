import { getStocks } from "src/api/stock";

export async function buscarProductosStock() {
  try {
    var result = await getStocks("quantity > 0", "id_product,id_location");
    if (result.status != 200) {
      return {
        type: "warning",
        message: "Error buscando inventario",
        data: null,
      };
    }
    console.log(result.data);
    return {
      type: "positive",
      message: "Inventario encontrado",
      data: result.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: `Error: ${error.message}`,
      data: null,
    };
  }
}
