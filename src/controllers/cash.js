import {
  createCash,
  getCashs,
  getCash,
  updateCash,
  deleteCash,
} from "src/api/cash";
import { useAuthStore } from "src/stores/auth";

export async function crearCaja(obj) {
  try {
    const store = useAuthStore();
    var currentUser = store.currentUser;
    obj.user = currentUser.id;
    var result = (await createCash(obj)).data;
    return {
      type: "positive",
      message: "Movimiento de caja creado correctamente!",
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

export async function buscarCajas() {
  try {
    var result = (await getCashs()).data;
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

export function buscarCaja(id) {
  return getCash(id);
}

export function actualizarCaja(id, obj) {
  return updateCash(id, obj);
}

export function borrarCaja(id) {
  return deleteCash(id);
}
