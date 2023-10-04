import { logIn, register, getStore } from "src/api/auth";
import { useAuthStore } from "src/stores/auth";

export async function buscarTienda(id) {
  try {
    var result = await getStore(id);
    if (result.status == 200) {
      return {
        type: "positive",
        message: "Tienda encontrada correctamente",
        data: result.data,
      };
    } else {
      return {
        type: "warning",
        message: result.statusText,
        data: null,
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}

export async function inicionSesion(user, pass) {
  const authStore = useAuthStore();

  try {
    if (user == null || pass == null) {
      return {
        type: "warning",
        message: "Valores invalidos",
        data: null,
      };
    }
    var result = await logIn(user, pass);
    if (result.status != 200) {
      return {
        type: "warning",
        message: "Usuario y/o contraseña invalida",
        data: null,
      };
    }
    var user = result.data.record;
    var token = result.data.token;
    authStore.loginUser(token, user);
    var store = result.data.record.expand.id_store;
    authStore.setStore(store);
    return {
      type: "positive",
      message: "Usuario validado correctamente!",
      data: result.data,
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}

export async function registrarUsuario(user) {
  try {
    if (user == null) {
      var result = (await register(user)).data;
      if (!result) {
        return {
          type: "warning",
          message: "Usuario y/o contraseña invalida",
          data: null,
        };
      }
      return {
        type: "positive",
        message: "Usuario registrado correctamente",
        data: result,
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: error.message,
      data: null,
    };
  }
}
