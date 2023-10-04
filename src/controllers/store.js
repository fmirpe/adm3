import { getStore, updateStore } from "src/api/store";

export async function buscarTienda() {
  try {
    var result = (await getStore()).data;
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

export async function actualizarTienda(obj) {
  try {
    console.log(obj);
    var result = await updateStore(obj.id, obj);
    return {
      type: "positive",
      message: "Información actualizada correctamente",
      date: result.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}
