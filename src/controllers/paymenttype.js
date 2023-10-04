import { getPaymentTypes } from "src/api/paymenttype";

export async function buscarTipoPago() {
  try {
    var result = await getPaymentTypes();
    if (result.status != 200) {
      return {
        type: "warning",
        message: `Error buscando tipos de pago`,
        data: null,
      };
    }
    return {
      type: "positive",
      message: "Tipos de pago encontrados",
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
