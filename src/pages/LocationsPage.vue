<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="text-h6">Inventarios</div>
    <q-space />
    <q-btn color="primary" icon="add" size="sm" dense @click="handleNew()">
      <q-tooltip>Nuevo inventario</q-tooltip>
    </q-btn>
    <q-btn
      class="q-ml-xs"
      color="primary"
      icon="playlist_add_check_circle"
      size="sm"
      dense
      @click="handleAddProduct()"
      v-if="selected.length > 0"
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
  </div>
  <div class="q-pa-md row items-start q-gutter-md">
    <div v-for="item in datos" :key="item.id">
      <q-card class="my-card">
        <q-card-section style="cursor: pointer" @click="handleAddProduct(item)">
          <div class="text-h6">{{ item.name }}</div>
          <div class="text-subtitle1 text-teal">
            Productos: {{ item.productos }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="handleEdit(item.id)"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDelete(item.id)"
          />
          <q-btn
            icon="category"
            color="positive"
            dense
            size="sm"
            @click="handleProduct(item.id)"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="modal">
    <q-card style="width: 400px">
      <q-card-section class="row items-center q-pb-none bg-primary">
        <div class="text-h6">Inventario</div>
        <q-space />
        <q-btn icon="close" flat size="sm" round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form ref="myForm" @submit.prevent="onSubmit()" class="q-gutter-md">
          <q-input
            v-model="formData.name"
            label="Nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo es requerido']"
          />

          <div>
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

  <q-dialog v-model="verproductos">
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none bg-primary">
        <div class="text-h6">Productos</div>
        <q-space />
        <q-btn icon="close" flat size="sm" round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-table
          title="Inventario"
          :rows="productos"
          :columns="columnsproducts"
          row-key="id"
          :filter="filter"
          :dense="$q.screen.lt.md"
          :visible-columns="myColsVis"
        >
          <template v-slot:top>
            <div class="text-h6">Inventarios</div>
            <q-space />

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
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import {
  getLocations,
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "../api/locations";
import { getStocks } from "../api/stock";

const router = useRouter();
const $q = useQuasar();

const selected = ref([]);
const filter = ref("");
const myForm = ref(null);
const modal = ref(false);
const modalTitle = ref("");
const modalOper = ref("N");
const datos = ref([]);

const myColsVis = ["id_product", "unit", "quantity"];
const productos = ref([]);
const verproductos = ref(false);

const columnsproducts = [
  {
    name: "id",
    field: "id",
    label: "Id",
    sortable: true,
    align: "left",
  },
  {
    name: "id_product",
    field: (row) => row.expand.id_product.name,
    label: "Descripción",
    sortable: true,
    align: "left",
  },
  {
    name: "unit",
    field: (row) => row.expand.id_product.unit,
    label: "Unidad",
    sortable: true,
    align: "left",
  },
  {
    name: "quantity",
    field: "quantity",
    label: "Cantidad",
    align: "right",
  },
];

const columns = [
  {
    name: "id",
    field: "id",
    label: "Id",
    sortable: true,
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: "Descripción",
    sortable: true,
    align: "left",
  },
  {
    name: "actions",
    field: "actions",
    label: "Actions",
    align: "right",
  },
];

const formData = ref({
  name: "",
});

function loadData() {
  getLocations().then(async (response) => {
    datos.value = response.data.items;
    for (const iterator of datos.value) {
      iterator.productos = await getProductStock(iterator.id);
    }
    $q.loading.hide();
  });
}

function handleNew() {
  formData.value = { name: "" };
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
      deleteLocation(id).then((response) => {
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
  getLocation(id).then((response) => {
    formData.value = response.data;
    modalTitle.value = "Editar registro";
    modalOper.value = "E";
    modal.value = true;
  });
}

function handleAddProduct(selected) {
  $q.localStorage.set("locationSelected", selected);
  router.push("/Products");
}

async function handleProduct(id) {
  var result = (await getStocks(`id_location='${id}'`, `id_product`)).data;
  console.log(result);
  productos.value = result.items;
  verproductos.value = true;
}

function onSubmit() {
  myForm.value.validate().then((success) => {
    if (success) {
      $q.loading.show();
      if (modalOper.value == "N") {
        createLocation(formData.value).then((response) => {
          modal.value = false;
          $q.loading.hide();
          loadData();
        });
      } else {
        updateLocation(formData.value.id, formData.value).then((response) => {
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

async function getProductStock(id) {
  var result = (await getStocks(`id_location='${id}'`)).data;
  return result.items.length;
}

onMounted(() => {
  $q.loading.show();
  loadData();
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 200px
  max-width: 400px
</style>
