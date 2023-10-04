<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-4">
        <q-card class="my-card">
          <q-img style="max-height: 240px; width: 100%" src="~/assets/caja.jpg">
            <div class="absolute-bottom text-h3">
              {{ formatterPeso.format(stotalCaja) }}
            </div>
          </q-img>

          <q-card-section class="text-center text-h5">
            <q-btn @click="goto('Cash')" flat>Dinero en Caja</q-btn>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4">
        <q-card class="my-card">
          <q-img style="height: 240px; width: 100%" src="~/assets/ventas.jpg">
            <div class="absolute-bottom text-h3">
              {{ formatterPeso.format(stotalVentas) }}
            </div>
          </q-img>

          <q-card-section class="text-center text-h5">
            <q-btn @click="goto('SalesToday')" flat>Ventas del día</q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="my-card">
          <apexchart
            style="height: 100%; width: 100%"
            type="bar"
            :options="ventas.options"
            :series="ventas.series"
          ></apexchart>
        </q-card>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col-12">
        <q-card style="height: 500px">
          <apexchart
            height="100%"
            type="bar"
            :options="comprativoventas.chartOptions"
            :series="comprativoventas.series"
          ></apexchart
        ></q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import {
  totalCaja,
  totalVentas,
  ventasUltimaSemana,
  redimientosUltimaSemana,
} from "src/controllers/dashboard";

import { useRouter } from "vue-router";

const router = useRouter();
const stotalCaja = ref(0);
const stotalVentas = ref(0);
const ventas = ref({});
const comprativoventas = ref({});

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function goto(pag) {
  router.push(pag);
}

onBeforeMount(async () => {
  stotalCaja.value = await totalCaja();
  stotalVentas.value = await totalVentas();
  ventas.value = await ventasUltimaSemana();
  comprativoventas.value = await redimientosUltimaSemana();
  console.log(comprativoventas.value);
});

const dataBar = computed(() => {
  return redimientosUltimaSemana();
});
</script>

<style lang="sass" scoped>
.my-card
  max-width: 450px
  min-height: 300px
</style>
