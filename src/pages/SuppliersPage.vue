<template>
  <div class="q-pa-md">
    <q-table title="Proveedores" :rows="datos" :columns="columns" row-key="id">
      <template v-slot:top>
        <div class="text-h6">Proveedores</div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          size="sm"
          dense
          @click="handleNew()"
        />
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
        <div class="text-h6">Proveedores</div>
        <q-space />
        <q-btn icon="close" flat size="sm" round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form ref="myForm" @submit.prevent="onSubmit()">
          <div class="row">
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.identification"
                label="Identificación"
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
                v-model="formData.address"
                label="Dirección"
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
                v-model="formData.telephone"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              />
            </div>
            <div class="col-6 q-pa-xs">
              <q-input
                v-model="formData.email"
                label="Email"
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
                v-model="formData.contact"
                label="Contacto"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import {
  getSuppliers,
  createSupplier,
  deleteSupplier,
  getSupplier,
  updateSupplier,
} from "src/api/suppliers";

import { getCategories } from "src/api/categories";

const router = useRouter();
const $q = useQuasar();

const myForm = ref(null);
const modal = ref(false);
const modalTitle = ref("");
const modalOper = ref("N");
const datos = ref([]);
const categorias = ref([]);
const columns = [
  {
    name: "id",
    field: "id",
    label: "Id",
    sortable: true,
    align: "left",
  },
  {
    name: "identification",
    field: "identification",
    label: "Identificación",
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
    name: "telephone",
    field: "telephone",
    label: "Teléfono",
    sortable: true,
    align: "left",
  },
  {
    name: "status",
    field: "status",
    label: "Activo",
    sortable: true,
    align: "left",
  },
  {
    name: "contact",
    field: "contact",
    label: "Contacto",
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
  identification: "",
  name: "",
  address: "",
  telephone: "",
  email: "",
  status: true,
  contact: "",
});

function createValue(val, done) {
  done(val);
}

function loadData() {
  getSuppliers().then((response) => {
    datos.value = response.data.items;
    $q.loading.hide();
  });
}

function handleNew() {
  formData.value = {
    identification: "",
    name: "",
    address: "",
    telephone: "",
    email: "",
    status: true,
    contact: "",
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
      deleteSupplier(id).then((response) => {
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
  getSupplier(id).then((response) => {
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
      console.log(formData.value);
      if (modalOper.value == "N") {
        createSupplier(formData.value).then((response) => {
          modal.value = false;
          $q.loading.hide();
          loadData();
        });
      } else {
        updateSupplier(formData.value.id, formData.value).then((response) => {
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

onMounted(() => {
  $q.loading.show();
  loadData();
});
</script>

<style></style>
