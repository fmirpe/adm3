<template>
  <div class="q-pa-md">
    <q-table
      title="Productos"
      :rows="datos"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      :visible-columns="myColsVis"
    >
      <template v-slot:top>
        <div class="text-h6">Productos</div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          size="sm"
          dense
          @click="handleNew()"
          class="q-ml-xs"
        />
        <q-btn
          class="q-ml-xs"
          color="primary"
          icon="playlist_add_check_circle"
          size="sm"
          dense
          @click="handleAddProduct()"
          v-if="locationSelected"
        >
          <q-tooltip>Agregar productos al inventario</q-tooltip>
        </q-btn>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
          class="q-ml-xs"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEdit(props.row.id)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="modal">
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Productos</div>
        <q-space />
        <q-btn icon="close" flat size="sm" round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form ref="myForm" @submit.prevent="onSubmit()">
          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.sku"
                label="Código"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.name"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-xs">
              <q-input
                v-model="formData.description"
                label="Descripción"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-select
                v-model="formData.id_category"
                :options="categorias"
                emit-value
                map-options
                option-value="id"
                option-label="name"
                label="Categoria"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <q-select
                label="Marca"
                v-model="formData.brand"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                @new-value="createValue"
                style="width: 250px"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.unit"
                label="Unidad de Medida"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.price_purchase"
                label="Precio de compra"
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.price_sales"
                label="Precio de venta"
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <q-toggle v-model="formData.status" label="Activo" left-label />
            </div>
          </div>

          <div class="q-pt-lg">
            <q-btn
              label="Aceptar"
              icon="done"
              dense
              size="sm"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Cancelar"
              icon="close"
              type="reset"
              color="primary"
              flat
              dense
              size="sm"
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="inventario">
    <q-card style="width: 700px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">
          Agregar al inventario a {{ locationSelected.name }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          title="Productos"
          :rows="selected"
          :columns="columns"
          row-key="id"
          :visible-columns="myColsVisInventary"
          binary-state-sort
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="sku" :props="props">
                {{ props.row.sku }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="unit" :props="props">
                {{ props.row.unit }}
              </q-td>
              <q-td key="quantity" :props="props">
                {{ props.row.quantity }}
                <q-popup-edit
                  v-model="props.row.quantity"
                  title="Cantidad"
                  v-slot="scope"
                >
                  <q-input
                    type="number"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn color="primary" label="Aceptar" @click="insertStock()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "src/api/products";

import { createStock, getStocks, updateStock } from "src/api/stock";

import { getCategories } from "src/api/categories";

const router = useRouter();
const $q = useQuasar();

const filter = ref("");
const selected = ref([]);
const myForm = ref(null);
const modal = ref(false);
const modalTitle = ref("");
const modalOper = ref("N");
const datos = ref([]);
const categorias = ref([]);
const locationSelected = ref(null);

const inventario = ref(false);

const myColsVis = ["sku", "name", "description", "brand", "unit", "actions"];
const myColsVisInventary = ["sku", "name", "unit", "quantity"];
const columns = [
  {
    name: "id",
    field: "id",
    label: "Id",
    sortable: true,
    align: "left",
  },
  {
    name: "sku",
    field: "sku",
    label: "Código",
    sortable: true,
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: "Nombre",
    sortable: true,
    align: "left",
  },
  {
    name: "description",
    field: "description",
    label: "Descripción",
    sortable: true,
    align: "left",
  },
  {
    name: "brand",
    field: "brand",
    label: "Marca",
    sortable: true,
    align: "left",
  },
  {
    name: "unit",
    field: "unit",
    label: "Unidad",
    sortable: true,
    align: "left",
  },
  {
    name: "actions",
    field: "actions",
    label: "Actions",
    align: "right",
  },
  {
    name: "quantity",
    field: "quantity",
    label: "Cantidad",
    align: "right",
  },
];

const formData = ref({
  sku: "",
  name: "",
  description: "",
  status: true,
  id_category: "",
  price_purchase: 0,
  price_sales: 0,
  brand: "",
  unit: "",
});

function createValue(val, done) {
  done(val);
}

function loadData() {
  getProducts().then((response) => {
    datos.value = response.data.items;
    $q.loading.hide();
  });
}

function handleNew() {
  formData.value = {
    sku: "",
    name: "",
    description: "",
    status: true,
    id_category: "",
    price_purchase: 0,
    price_sales: 0,
    brand: null,
    unit: null,
  };
  modal.value = true;
  modalTitle.value = "Nuevo registro";
  modalOper.value = "N";
}

function handleDelete(id) {
  $q.dialog({
    title: "Confirmar",
    message: "Está seguro de borrar el registro?",
    cancel: {
      label: "Cancelar",
      color: "red",
    },
    ok: {
      label: "Aceptar",
      color: "primary",
    },

    persistent: true,
  })
    .onOk(() => {
      console.log(">>>> OK");
      $q.loading.show();
      deleteProduct(id).then((response) => {
        loadData();
        $q.loading.hide();
      });
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

function handleEdit(id) {
  getProduct(id).then((response) => {
    formData.value = response.data;
    modalTitle.value = "Editar registro";
    modalOper.value = "E";
    modal.value = true;
  });
}

function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      $q.loading.show();
      if (modalOper.value == "N") {
        createProduct(formData.value).then((response) => {
          modal.value = false;
          $q.loading.hide();
          loadData();
        });
      } else {
        updateProduct(formData.value.id, formData.value).then((response) => {
          modal.value = false;
          $q.loading.hide();
          loadData();
        });
      }
    } else {
      $q.notify("Datos invalidos por favor verifique!");
    }
  });
}

function loadCategories() {
  $q.loading.show();
  getCategories().then((response) => {
    categorias.value = response.data.items;
    $q.loading.hide();
  });
}

function handleAddProduct() {
  if (selected.value.length > 0) {
    for (const iterator of selected.value) {
      iterator.quantity = 0;
    }
    inventario.value = true;
  } else {
    $q.notify({ type: "warning", message: "Debe seleccionar productos" });
  }
}

async function insertStock() {
  for (const iterator of selected.value) {
    var obj = {
      id_product: iterator.id,
      id_location: locationSelected.value.id,
      quantity: parseInt(iterator.quantity),
    };
    var filter = `id_product='${obj.id_product}' && id_location='${obj.id_location}'`;
    var searesult = (await getStocks(filter)).data;
    if (searesult.items.length > 0) {
      obj.id = searesult.items[0].id;
      obj.quantity += searesult.items[0].quantity;
      var resultupdate = (await updateStock(obj.id, obj)).data;
    } else {
      var result = (await createStock(obj)).data;
    }
  }

  inventario.value = false;
  $q.notify({ type: "success", message: "Inventario creado correctamente!" });
}

onMounted(() => {
  $q.loading.show();
  loadCategories();
  loadData();

  locationSelected.value = $q.localStorage.getItem("locationSelected");
});

onUnmounted(() => {
  $q.localStorage.set("locationSelected", null);
});
</script>

<style></style>
