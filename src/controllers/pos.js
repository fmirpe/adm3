import {
  getLocations,
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "src/api/locations";
import { getStocks, updateStock } from "src/api/stock";
import { getCustomers, getCustomer, updateCustomer } from "src/api/customers";
import { createSale, createSaleDetail } from "src/api/pos";
import { createCash } from "src/api/cash";
import { useAuthStore } from "src/stores/auth";

export async function crearVenta(sales, sales_detail) {
  try {
    var store = useAuthStore();
    var currentUser = store.currentUser;
    console.log(currentUser);
    var resultventa = (await createSale(sales)).data;
    var detalleventa = [];
    console.log(resultventa);
    if (resultventa) {
      for (const item of sales_detail) {
        item.id_sales = resultventa.id;
        console.log(item);
        var resp = (await createSaleDetail(item)).data;
        console.log(resp);
        if (resp) {
          detalleventa.push(resp);
          var stock = (
            await getStocks(
              `id_product='${resp.id_product}' && id_location='${resp.id_location}'`,
              ""
            )
          ).data.items[0];
          console.log(stock);
          stock.quantity -= item.quantity;
          var respstock = (await updateStock(stock.id, stock)).data;
          console.log(respstock);
        }
      }
      if (resultventa.sale_type == "Contado") {
        var cashobj = {
          amount: resultventa.total,
          concept: "Venta POS",
          reference: `Venta-${resultventa.id}`,
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
