<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <div class="col-4">
        <q-card class="my-card">
          <q-img src="~/assets/caja.jpg">
            <div class="absolute-bottom text-h3">
              {{ formatterPeso.format(stotalCaja) }}
            </div>
          </q-img>

          <q-card-section class="text-center text-h5">
            <q-btn flat>Dinero en Caja</q-btn>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4">
        <q-card class="my-card">
          <q-img src="~/assets/ventas.jpg">
            <div class="absolute-bottom text-h3">
              {{ formatterPeso.format(stotalVentas) }}
            </div>
          </q-img>

          <q-card-section class="text-center text-h5">
            <q-btn flat>Ventas del día</q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { totalCaja, totalVentas } from "src/controllers/dashboard";

const stotalCaja = ref(0);
const stotalVentas = ref(0);

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

onBeforeMount(async () => {
  stotalCaja.value = await totalCaja();
  stotalVentas.value = await totalVentas();
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 200px
  min-height: 40px
</style>
