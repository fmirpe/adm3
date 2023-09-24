<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="row">
            <div class="col-6">
              <q-select
                v-model="producto"
                use-input
                input-debounce="0"
                :options="productos"
                @filter="filterFn"
                style="width: 650px"
                :option-value="(opt) => opt.id"
                :option-label="(opt) => opt.nombreproducto"
                map-options
                @update:model-value="updateModel"
                label="Buscar producto"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section>
                      <q-icon name="warning" color="warning" size="4rem" />
                    </q-item-section>
                    <q-item-section class="text-grey">
                      No hay resultados
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>
                        <div class="text-bold">
                          {{ scope.opt.nombreproducto }}
                        </div>
                        <q-badge color="blue-grey">
                          {{ scope.opt.sku }}
                        </q-badge>
                      </q-item-label>
                      <q-item-label caption>{{ scope.opt.marca }}</q-item-label>
                    </q-item-section>
                    <q-item-section class="text-right">
                      <q-item-label
                        ><q-badge color="blue">
                          Precio: ${{ scope.opt.precio }}
                        </q-badge></q-item-label
                      >
                      <q-item-label
                        ><q-badge color="blue">
                          Disp: {{ scope.opt.cantidad }}
                        </q-badge>
                      </q-item-label>
                      <q-item-label caption>
                        Ubicación: {{ scope.opt.nombreubicacion }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-6">
              <q-btn color="red" @click="handleCancel()" rounded
                >Cancelar venta</q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-pt-lg">
      <div class="col-8 q-pr-lg">
        <q-table
          title="Productos"
          :rows="detalleventa"
          :columns="columndetalle"
          row-key="index"
          hide-pagination
          :visible-columns="colvisdetalle"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombreproducto" :props="props">
                <div class="text-bold">{{ props.row.nombreproducto }}</div>
                <div class="text-caption">{{ props.row.nombreubicacion }}</div>
              </q-td>
              <q-td key="cantidad" :props="props">
                {{ props.row.cantidad }}
              </q-td>
              <q-td key="precio" :props="props">
                {{ formatterPeso.format(props.row.precio) }}
              </q-td>
              <q-td key="venta" :props="props">
                <q-input
                  filled
                  style="width: 120px"
                  v-model.number="props.row.venta"
                  type="number"
                  lazy-rules
                  :rules="[
                    (val) => !!val || '* Valor requerido',
                    (val) =>
                      val <= props.row.cantidad ||
                      'Cantidad super la existencia',
                  ]"
                />
              </q-td>
              <!-- <q-td key="descuento" :props="props">
                {{ props.row.descuento }}
              </q-td> -->
              <q-td key="subtotal" :props="props">
                {{ formatterPeso.format(props.row.subtotal) }}
              </q-td>
              <q-td key="accion" :props="props">
                <q-btn
                  icon="delete"
                  color="negative"
                  dense
                  round
                  size="sm"
                  @click="handleDelete(props.row.id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-4 full-height">
        <q-card style="height: 60vh">
          <q-card-section>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">SubTotal</div>
              <div class="col-6 text-subtitle1 text-right">
                {{ formatterPeso.format(venta.subtotal) }}
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">Total</div>
              <div class="col-6 text-subtitle1 text-right text-blue">
                {{ formatterPeso.format(venta.total) }}
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">Paga con</div>
              <div class="col-6 text-subtitle1 text-right">
                <q-input
                  v-model.number="venta.paga"
                  type="number"
                  style="width: 100%"
                  input-class="text-right"
                  mask="#.##"
                  fill-mask="0"
                  reverse-fill-mask
                  dense
                />
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">Vuelto</div>
              <div class="col-6 text-subtitle1 text-right text-blue">
                {{ formatterPeso.format(venta.vuelto) }}
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">Tipo de venta</div>
              <div class="col-6">
                <q-btn-toggle
                  v-model="venta.tipoventa"
                  spread
                  no-caps
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="[
                    { label: 'Contado', value: 'Contado' },
                    { label: 'Crédito', value: 'Credito' },
                  ]"
                />
              </div>
            </div>
            <div class="row q-pa-sm">
              <div class="col-6 text-subtitle1">Cliente</div>
              <div class="col-6">
                <q-select
                  v-model="venta.cliente"
                  use-input
                  input-debounce="0"
                  :options="customers"
                  @filter="filterFnCus"
                  style="width: 100%"
                  behavior="menu"
                  :option-value="(opt) => opt.id"
                  :option-label="(opt) => opt.name"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay clientes
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row q-pa-xl text-center">
              <div class="col-12">
                <q-btn
                  color="primary"
                  icon="price_check"
                  label="Finalizar venta"
                  style="width: 100%"
                  @click="handleFinish()"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeMount, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import {
  getLocations,
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "src/api/locations";
import { getStocks, updateStock } from "src/api/stock";
import { getCustomers } from "src/api/customers";
import { createSale, createSaleDetail } from "src/api/pos";

const $q = useQuasar();

const router = useRouter();
const productos = ref([]);
const productosori = ref([]);
const producto = ref({});
const customers = ref([]);
const customersori = ref([]);

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const tipoventa = ref(["Contado", "Credito"]);

const venta = ref({
  subtotal: 0,
  total: 0,
  paga: 0,
  vuelto: 0,
  cliente: null,
  tipoventa: "Contado",
});
const detalleventa = ref([]);

const colvisdetalle = ref([
  "nombreproducto",
  "cantidad",
  "precio",
  "venta",
  "subtotal",
  "accion",
]);
const columndetalle = ref([
  {
    name: "id",
    label: "Id",
    field: "id",
    align: "left",
  },
  {
    name: "nombreproducto",
    label: "Producto",
    field: "nombreproducto",
    align: "left",
    format: (val, row) => `${val}<br>${row.nombreubicacion}`,
  },
  {
    name: "cantidad",
    label: "Existencia",
    field: "cantidad",
    align: "right",
  },
  {
    name: "precio",
    label: "Precio",
    field: "precio",
    align: "right",
    format: (val, row) => `${formatterPeso.format(val)}`,
  },
  {
    name: "venta",
    label: "Cantidad",
    field: "venta",
    align: "center",
  },
  {
    name: "descuento",
    label: "Descuento",
    field: "descuento",
    align: "right",
  },
  {
    name: "subtotal",
    label: "Subtotal",
    field: "subtotal",
    align: "right",
    format: (val, row) => `${formatterPeso.format(val)}`,
  },
  {
    name: "accion",
    label: "Acciones",
    field: "accion",
    align: "center",
  },
]);

const valCantidad = ref([
  (val) => (val !== null && val !== "") || "Please type your age",
  (val) => (val > 0 && val < 100) || "Please type a real age",
]);

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    productos.value = productosori.value.filter(
      (v) => v.nombreproducto.toLowerCase().indexOf(needle) > -1
    );
  });
}

function filterFnCus(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    customers.value = customersori.value.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
}

function handleFinish() {
  var validado = false;
  console.debug(venta.value);
  console.debug(detalleventa.value);

  if (detalleventa.value.length > 0) {
    if (venta.value.vuelto >= 0) {
      validado = true;
    } else {
      $q.notify({
        type: "warning",
        message: "El valor pagado en inferior a la venta",
      });
    }
    if (validado) {
      var obj = {
        sale_type: venta.value.tipoventa,
        id_customer:
          venta.value.cliente == null
            ? "eu6deuudvv8ax75"
            : venta.value.cliente.id,
        discount: 0,
        subtotal: venta.value.subtotal,
        total: venta.value.total,
        status: true,
      };
      createSale(obj).then(async (response) => {
        console.log(response.data);
        var ventanueva = response.data;
        for (const item of detalleventa.value) {
          var obj = {
            id_sales: ventanueva.id,
            id_product: item.id_product,
            id_location: item.id_location,
            price: item.precio,
            quantity: item.venta,
            subtotal: item.subtotal,
          };
          var resp = (await createSaleDetail(obj)).data;
          console.log(resp);
          if (resp) {
            var objst = {
              quantity: item.cantidad - item.venta,
              id_product: item.id_product,
              id_location: item.id_location,
              id: item.id,
            };
            var respstock = (await updateStock(objst.id, objst)).data;
            console.log(respstock);
          }
        }
        venta.value = {
          subtotal: 0,
          total: 0,
          paga: 0,
          vuelto: 0,
          cliente: null,
          tipoventa: "Contado",
        };
        detalleventa.value = [];
        $q.notify({
          type: "positive",
          message: "Venta finalizada correctamente",
        });
      });
    }
  } else {
    $q.notify({
      type: "warning",
      message: "No hay detalle de venta",
    });
  }
}

function handleCancel() {
  venta.value = {
    subtotal: 0,
    total: 0,
    paga: 0,
    vuelto: 0,
    cliente: null,
    tipoventa: "Contado",
  };
  detalleventa.value = [];
}

function handleDelete(id) {
  const index = detalleventa.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    detalleventa.value.splice(index, 1);
  }
}

watch(venta.value, (newvalue, oldvalue) => {
  venta.value.vuelto = venta.value.paga - venta.value.total;
});

watch(detalleventa.value, (newvalue, oldvalue) => {
  venta.value.subtotal = 0;
  detalleventa.value.forEach((row, index) => {
    row.subtotal = row.venta * row.precio;
    venta.value.subtotal += row.subtotal;
  });
  venta.value.total = venta.value.subtotal;
});

function updateModel(value) {
  var encontro = false;
  if (detalleventa.value.length > 0) {
    for (const iterator of detalleventa.value) {
      if (iterator.id == value.id) {
        iterator.venta += 1;
        iterator.subtotal = iterator.venta * iterator.precio;
        iterator.descuento = 0;
        encontro = true;
      }
    }
    if (!encontro) {
      value.venta = 1;
      value.descuento = 0;
      value.subtotal = value.venta * value.precio;
      detalleventa.value.push(value);
    }
  } else {
    value.venta = 1;
    value.descuento = 0;
    value.subtotal = value.venta * value.precio;
    detalleventa.value.push(value);
  }

  producto.value = null;
}

function loadData() {
  getStocks("", "id_product,id_location").then((response) => {
    var ori = response.data.items;
    for (const iterator of ori) {
      var obj = {
        id: iterator.id,
        sku: iterator.expand.id_product.sku,
        nombreproducto: iterator.expand.id_product.name,
        descripcionproducto: iterator.expand.id_product.description,
        cantidad: iterator.quantity,
        nombreubicacion: iterator.expand.id_location.name,
        marca: iterator.expand.id_product.brand.join(" | "),
        precio: iterator.expand.id_product.price_sales,
        id_product: iterator.id_product,
        id_location: iterator.id_location,
      };
      productosori.value.push(obj);
    }
    productos.value = productosori.value;
  });
}

function loadCustomer() {
  getCustomers().then((response) => {
    customers.value = response.data.items;
    customersori.value = customers.value;
  });
}

onBeforeMount(() => {
  loadCustomer();
  loadData();
});
</script>
