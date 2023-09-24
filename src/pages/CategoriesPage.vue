<template>
  <div class="q-pa-md">
    <q-table title="Categorias" :rows="datos" :columns="columns" row-key="id">
      <template v-slot:top>
        <div class="text-h6">Categorias</div>
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
    <q-card style="width: 400px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Categorias</div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../api/categories";

const router = useRouter();
const $q = useQuasar();

const myForm = ref(null);
const modal = ref(false);
const modalTitle = ref("");
const modalOper = ref("N");
const datos = ref([]);
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
  getCategories().then((response) => {
    console.log(response.data);
    datos.value = response.data.items;
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
      deleteCategory(id).then((response) => {
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
  console.log(id);
  getCategory(id).then((response) => {
    console.log(response.data);
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
        createCategory(formData.value).then((response) => {
          modal.value = false;
          $q.loading.hide();
          loadData();
        });
      } else {
        updateCategory(formData.value.id, formData.value).then((response) => {
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
