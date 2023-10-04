import {
  getLocations,
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "src/api/locations";
import { getStocks, updateStock } from "src/api/stock";
import { getCustomers, getCustomer, updateCustomer } from "src/api/customers";
import { createSale, createSaleDetail } from "src/api/sales";
import { createCash } from "src/api/cash";
import { useAuthStore } from "src/stores/auth";
import { date } from "quasar";

export async function crearVenta(sales, sales_detail) {
  try {
    const fecha = Date.now();
    const ahora = date.formatDate(fecha, "x");
    var store = useAuthStore();
    var currentUser = store.currentUser;
    sales.user = currentUser.id;
    sales.salenumber = `VENT-${ahora}`;
    var resultventa = (await createSale(sales)).data;
    var detalleventa = [];
    if (resultventa) {
      for (const item of sales_detail) {
        item.id_sales = resultventa.id;
        var resp = (await createSaleDetail(item)).data;
        if (resp) {
          detalleventa.push(resp);
          var stock = (
            await getStocks(
              `id_product='${resp.id_product}' && id_location='${resp.id_location}'`,
              ""
            )
          ).data.items[0];
          stock.quantity -= item.quantity;
          var respstock = (await updateStock(stock.id, stock)).data;
        }
      }
      if (resultventa.sale_type == "Contado") {
        var cashobj = {
          amount: resultventa.total,
          concept: "Venta POS",
          reference: `${resultventa.salenumber}`,
          type: "add",
          user: currentUser.id,
        };
        var respcash = (await createCash(cashobj)).data;
      } else {
        var customer = (await getCustomer(resultventa.id_customer)).data;
        if (customer) {
          customer.balance += resultventa.total;
          var respcus = await updateCustomer(customer.id, customer).data;
        }
      }
      return {
        type: "positive",
        message: "Venta creada correctamente!",
        data: {
          sales: resultventa,
          sales_detail: detalleventa,
        },
      };
    } else {
      return {
        type: "warning",
        message: "No fue posible crear la venta",
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

export async function actualizarStock(id, id_product, id_location, quantity) {
  if (
    id == null ||
    id_product == null ||
    id_location == null ||
    quantity == null
  ) {
    return {
      type: "warning",
      message: "Datos incompletos",
      data: null,
    };
  }
  try {
    var result = (await updateStock(id, { id_location, id_product, quantity }))
      .data;
    return {
      type: "positive",
      message: "Inventario actualizado correctamente!",
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
