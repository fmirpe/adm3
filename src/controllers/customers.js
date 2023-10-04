import {
  createCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
  deleteCustomer,
} from "src/api/customers";

export async function borrarCliente(id) {
  try {
    var result = (await deleteCustomer(id)).data;
    return {
      type: "positive",
      message: "Cliente borrado correctamente",
      data: null,
    };
  } catch (error) {
    return {
      type: "error",
      message: `Error: ${error.message}`,
      data: null,
    };
  }
}
export async function buscarCliente(id) {
  try {
    var result = (await getCustomer(id)).data;
    return {
      type: "positive",
      message: "Todo correcto",
      data: result,
    };
  } catch (error) {
    return {
      type: "error",
      message: `Error: ${error.message}`,
      data: null,
    };
  }
}

export async function buscarClientesVenta() {
  try {
    var result = await getCustomers("identification != '9999'");
    return {
      type: "positive",
      message: "Todo correcto",
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

export async function buscarClientes() {
  try {
    var result = await getCustomers();
    return {
      type: "positive",
      message: "Todo correcto",
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

export async function actualizarCliente(obj) {
  try {
    if (!obj) {
      return {
        type: "warning",
        message: "Datos invalidos",
        data: null,
      };
    }
    var result = await updateCustomer(obj);
    if (result.status == 200) {
      return {
        type: "positive",
        message: "Cliente actualizado correctamente",
        data: result.data,
      };
    } else {
      return {
        type: "warning",
        message: "Error actualizando cliente",
        data: null,
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: `Error: ${error.message}`,
      data: null,
    };
  }
}

export async function crearCliente(obj) {
  try {
    if (!obj) {
      return {
        type: "warning",
        message: "Datos invalidos",
        data: null,
      };
    }
    var result = await createCustomer(obj);
    if (result.status == 200) {
      return {
        type: "positive",
        message: "Cliente creado correctamente",
        data: result.data,
      };
    } else {
      return {
        type: "warning",
        message: "Error creando cliente",
        data: null,
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: `Error: ${error.message}`,
      data: null,
    };
  }
}
