<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          :icon="leftDrawerOpen ? 'menu' : 'menu_open'"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img :src="urlStore" @click="home()" />
          </q-avatar>
          {{ tituloTienda }}
        </q-toolbar-title>
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="text-grey-7"
            icon="apps"
          >
            <q-tooltip>Adm3</q-tooltip>
          </q-btn> -->
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn-dropdown no-caps :label="usuario.email" flat>
            <div class="row no-wrap q-pa-md">
              <!-- <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" /> -->

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="urlFoto" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ usuario.name }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                  @click="logout()"
                />
              </div>
            </div>
          </q-btn-dropdown>

          <!-- <q-btn round flat>
            <q-avatar size="26px">
              <img :src="urlFoto" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-white"
      :width="280"
    >
      <!-- drawer content -->

      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            :to="link.to"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <div class="q-mt-md fixed-bottom absolute-bottom">
            <div class="flex flex-center q-gutter-xs">
              <a
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="Privacy"
                >Privacy</a
              >
              <span> · </span>
              <a
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="Terms"
                >Terms</a
              >
              <span> · </span>
              <a
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="About"
                >About</a
              >
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          <div>Adm3</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "src/stores/auth";
import { api } from "../boot/axios";

import { useRouter } from "vue-router";

const router = useRouter();

const leftDrawerOpen = ref(false);
const store = useAuthStore();
const urlStore = ref("");
const urlFoto = ref("");
const tienda = ref({});
const usuario = ref({});
const tituloTienda = ref("");

const links1 = ref([
  { icon: "point_of_sale", text: "POS", to: "/Pos" },
  { icon: "fact_check", text: "Ventas", to: "/Sales" },
  { icon: "category", text: "Categorias", to: "/Categories" },
  { icon: "inventory", text: "Productos", to: "/Products" },
  { icon: "perm_contact_calendar", text: "Clientes", to: "/Customers" },
  { icon: "inventory_2", text: "Inventario", to: "/Locations" },
  { icon: "folder_shared", text: "Proveedores", to: "/Suppliers" },
  { icon: "settings_suggest", text: "Configuración", to: "/Setting" },
]);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function home() {
  router.push("/");
}

function logout() {
  router.push("/Login");
}

onMounted(() => {
  tienda.value = store.currentStore;
  usuario.value = store.currentUser;
  if (usuario.value) {
    console.log(tienda.value);
    urlStore.value = `${api.defaults.baseURL}/files/stores/${tienda.value.id}/${tienda.value.avatar}?token=${store.getToken}`;
    console.log(urlStore.value);
    urlFoto.value = `${api.defaults.baseURL}/files/users/${usuario.value.id}/${usuario.value.avatar}?token=${store.getToken}`;
    tituloTienda.value = tienda.value.name;
  } else {
    router.push("/Login");
  }
});
</script>
