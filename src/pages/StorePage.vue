<template>
  <div class="q-pa-md" style="width: 100%">
    <q-form
      ref="myForm"
      @submit="onSubmit"
      class="q-gutter-md"
      enctype="multipart/form-data"
    >
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="col-6 q-pr-xs">
              <q-input
                filled
                v-model="formData.name"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>
            </div>
            <div class="col-6 q-pl-xs">
              <q-input
                filled
                v-model="formData.address"
                label="Dirección"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo es requerido',
                ]"
                ><template v-slot:prepend>
                  <q-icon name="home" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6 q-pr-xs">
              <q-input
                filled
                v-model="formData.phone"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="phone_iphone" />
                </template>
              </q-input>
            </div>
            <div class="col-6 q-pl-xs">
              <q-input
                filled
                v-model="formData.email"
                label="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                ><template v-slot:prepend> <q-icon name="email" /> </template
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6 q-pr-xs">
              <q-input
                filled
                v-model="formData.identification"
                label="Identificación"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
                <template v-slot:prepend> <q-icon name="business" /> </template
              ></q-input>
            </div>
            <div class="col-6 q-pl-xs">
              <q-file
                class="avatar"
                v-model="formData.avatar"
                filled
                label="Logo"
                accept=".jpg, image/*"
                @rejected="onRejected"
                ><template v-slot:prepend>
                  <q-icon name="attach_file" /> </template
              ></q-file>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <div>
            <q-btn no-caps label="Aceptar" type="submit" color="primary" />
          </div>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { buscarTienda, actualizarTienda } from "src/controllers/store";

const router = useRouter();
const $q = useQuasar();
const myForm = ref(null);
const formData = ref({
  identification: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  status: true,
  avatar: "",
});

function onRejected(rejectedEntries) {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}

function onSubmit() {
  console.log("Por aca");
  myForm.value.validate().then(async (success) => {
    if (success) {
      var result = await actualizarTienda(formData.value);
      $q.notify({ type: result.type, message: result.message });
      if (result.type == "positive") {
        router.push("/");
      }
    } else {
      $q.notify({ type: "warning", message: "Por favor verifique!" });
      return false;
    }
  });
}
async function loadData() {
  $q.loading.show();
  var result = await buscarTienda();
  if (result.type == "positive") {
    formData.value = {
      id: result.data.items[0].id,
      identification: result.data.items[0].identification,
      name: result.data.items[0].name,
      address: result.data.items[0].address,
      phone: result.data.items[0].phone,
      email: result.data.items[0].email,
      status: result.data.items[0].status,
      avatar: result.data.items[0].avatar,
    };
    $q.loading.hide();
  } else {
    $q.notify({ type: result.type, message: result.message });
    $q.loading.hide();
  }
}

onMounted(() => {
  console.log("Inicio");
  loadData();
});
</script>
