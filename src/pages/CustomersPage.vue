<template>
  <div class="q-pa-md">
    <q-table
      title="Clientes"
      :rows="datos"
      :columns="columns"
      row-key="id"
      :visible-columns="visculumns"
      :filter="filter"
    >
      <template v-slot:top>
        <div class="text-h6">Clientes</div>
        <q-space />
        <q-btn
          color="primary"
          icon="add"
          size="md"
          dense
          rounded
          @click="handleNew()"
        />
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
            rounded
            icon="edit"
            color="info"
            dense
            size="md"
            @click="handleEdit(props.row.id)"
          />
          <q-btn
            rounded
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="handleDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="modal">
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Clientes</div>
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
  crearCliente,
  actualizarCliente,
  buscarClientes,
  buscarCliente,
  borrarCliente,
} from "src/controllers/customers";

const router = useRouter();
const $q = useQuasar();
const filter = ref("");
const myForm = ref(null);
const modal = ref(false);
const modalTitle = ref("");
const modalOper = ref("N");
const datos = ref([]);
const visculumns = ref([
  "identification",
  "name",
  "telephone",
  "status",
  "balance",
  "actions",
]);
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
    name: "balance",
    field: "balance",
    label: "Saldo",
    sortable: true,
    align: "right",
    format: (val) => `${formatterPeso.format(val)}`,
  },
  {
    name: "actions",
    field: "actions",
    label: "Actions",
    align: "right",
  },
];

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const formData = ref({
  identification: "",
  name: "",
  address: "",
  telephone: "",
  email: "",
  status: true,
  balance: 0,
});

function createValue(val, done) {
  done(val);
}

async function loadData() {
  var result = await buscarClientes();
  if (result.type == "positive") {
    datos.value = result.data.items;
  }
  $q.notify({ type: result.type, message: result.message });
  $q.loading.hide();
}

function handleNew() {
  formData.value = {
    identification: "",
    name: "",
    address: "",
    telephone: "",
    email: "",
    status: true,
    balance: 0,
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
    .onOk(async () => {
      console.log(">>>> OK");
      $q.loading.show();
      var result = await borrarCliente(id);
      $q.notify({ type: result.type, message: result.message });
      loadData();
      $q.loading.hide();
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    });
}

async function handleEdit(id) {
  var result = await buscarCliente(id);
  if (result.type == "positive") {
    formData.value = result.data;
    modalTitle.value = "Editar registro";
    modalOper.value = "E";
    modal.value = true;
  }
}

async function onSubmit() {
  myForm.value.validate().then(async (success) => {
    if (success) {
      $q.loading.show();
      if (modalOper.value == "N") {
        var result = await crearCliente(formData.value);
        $q.notify({
          type: result.type,
          message: result.message,
        });
      } else {
        var result = await actualizarCliente(formData.value.id, formData.value);
        $q.notify({
          type: result.type,
          message: result.message,
        });
      }
      modal.value = false;
      loadData();
      $q.loading.hide();
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
