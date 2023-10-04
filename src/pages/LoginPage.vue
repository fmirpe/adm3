<template>
  <q-card class="q-ma-xl">
    <div class="row">
      <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
        <div
          class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
        >
          <div class="">
            <div
              class="text-h4 text-uppercase text-white fredoka"
              style="min-width: 220px"
            >
              Bienvenido!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Ingrese su usuario para iniciar!
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-7">
        <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
          <div class="col-12 fredoka text-subtitle1">
            <router-link
              class="text-primary"
              style="text-decoration: none"
              to="/"
            >
              POS Adm3 v1.0
            </router-link>
          </div>
        </div>
        <div class="row q-pa-sm-sm q-pa-md">
          <div class="col-12">
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div
                    class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                  >
                    Inicio de sesión
                  </div>
                </div>
              </div>

              <q-form
                ref="form"
                class="q-gutter-md"
                @submit.prevent.stop="submit"
              >
                <q-input v-model="usuario.email" label="Email" name="Email" />

                <q-input
                  v-model="usuario.password"
                  label="Clave"
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div class="q-mt-md">
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Inicio"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      No tiene cuenta?
                      <router-link class="text-primary" to="/register"
                        >Registrar</router-link
                      >
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { inicionSesion } from "src/controllers/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";

const $q = useQuasar();
const router = useRouter();
const isPwd = ref(true);
const form = ref(null);
const authStore = useAuthStore();

const usuario = ref({
  email: null,
  password: null,
});

async function submit() {
  if (form.value.validate()) {
    $q.loading.show();
    var result = await inicionSesion(
      usuario.value.email,
      usuario.value.password
    );
    $q.notify({
      message: result.message,
      type: result.type,
    });
    if (result.type == "positive") {
      $q.loading.hide();
      router.push("/");
    } else {
      $q.loading.hide();
    }
  }
}

onBeforeMount(() => {
  authStore.clearUser();
  $q.loading.hide();
});
</script>
