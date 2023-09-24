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
              Welcome!
            </div>
            <div class="text-white q-my-sm text-subtitle1">
              Please sign in to your account to get started!
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
              System Name
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
                    Login
                  </div>
                </div>
              </div>

              <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input v-model="user.email" label="Email" name="Email" />

                <q-input
                  v-model="user.password"
                  label="Password"
                  name="password"
                  type="password"
                />

                <div>
                  <q-btn
                    class="full-width fredoka"
                    color="primary"
                    label="Login"
                    rounded
                    type="submit"
                  ></q-btn>

                  <div class="q-mt-lg">
                    <div class="q-mt-sm">
                      Don't have an account yet?
                      <router-link class="text-primary" to="/register"
                        >Register</router-link
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
import { ref, reactive, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { logIn, getStore } from "../api/auth";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const $q = useQuasar();

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({
  email: null,
  password: null,
});

const form = ref(null);

const submit = async () => {
  if (form.value.validate()) {
    $q.loading.show();
    logIn(user.email, user.password)
      .then(async (response) => {
        var user = response.data.record;
        var token = response.data.token;
        authStore.loginUser(token, user);
        var store = (await getStore(user.id_store)).data;
        authStore.setStore(store);
        $q.loading.hide();

        $q.notify({
          message: "Usuario validado correctamente!",
          type: "positive",
        });
        router.push("/");
      })
      .catch((error) => {
        $q.loading.hide();
        console.log(error);
        $q.notify({
          message: "Error validando usuario/contraseña",
          type: "warning",
        });
      });
  }
};

onBeforeMount(() => {
  authStore.clearUser();
  $q.loading.hide();
});
</script>
