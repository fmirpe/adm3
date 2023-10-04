<template>
  <div class="row q-pa-md">
    <div class="text-h3">Caja</div>
    <q-space />
    <div>
      <q-btn
        @click="refresh()"
        icon="refresh"
        color="primary"
        no-caps
        label="Refrescar"
      />
    </div>
    <div class="q-pl-xs">
      <q-btn
        @click="cierreCaja"
        icon="account_balance_wallet"
        color="green"
        no-caps
        label="Cierre de caja"
      />
    </div>
  </div>
  <div class="row q-pa-md">
    <div class="col-3">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h4">Dinero en Caja</div>
          <q-separator />
          <div class="text-h6">Total</div>
          <div class="text-h6 text-secondary">
            {{ formatterPeso.format(stotalCaja) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-9 q-pl-md">
      <q-table
        title="Movimientos de caja"
        :rows="datacaja"
        :columns="columns"
        row-key="id"
        :visible-columns="visculumns"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="amount" :props="props">
              <q-badge color="green">
                {{ formatterPeso.format(props.row.amount) }}
              </q-badge>
            </q-td>
            <q-td key="concept" :props="props">
              {{ props.row.concept }}
            </q-td>
            <q-td key="reference" :props="props">
              {{ props.row.reference }}
            </q-td>
            <q-td key="user" :props="props">
              {{ props.row.expand.user.name }}
            </q-td>
            <q-td key="created" :props="props">
              {{ date.formatDate(props.row.created, "YYYY-MM-DD HH:mm") }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>

  <q-dialog v-model="toolbar">
    <q-card>
      <q-toolbar class="bg-primary">
        <!-- <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar> -->

        <q-toolbar-title
          ><span class="text-weight-bold text-white">Cierre de caja</span>
        </q-toolbar-title>

        <q-btn color="white" flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row">
            <div class="col-6 q-pa-md">
              <q-number
                filled
                type="number"
                input-class="text-right"
                v-model="formCaja.valor"
                label="Valor retiro"
                :options="{
                  prefix: '$',
                  suffix: '',
                  reverseFill: false,
                  min: undefined,
                  max: undefined,
                }"
              />
            </div>
            <div class="col-6 q-pa-md">
              <q-number
                filled
                type="number"
                input-class="text-right"
                v-model="formCaja.saldocaja"
                label="Saldo"
                readonly
                :options="{
                  prefix: '$',
                  suffix: '',
                  reverseFill: false,
                  min: undefined,
                  max: undefined,
                }"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-md">
              <q-input
                label="Observaciones"
                v-model="formCaja.observacion"
                filled
                type="textarea"
              />
            </div>
          </div>

          <div class="text-right">
            <q-btn no-caps label="Aceptar" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, date } from "quasar";
import { totalCaja } from "src/controllers/dashboard";
import { buscarCajas, crearCaja } from "src/controllers/cash";

const $q = useQuasar();
const filter = ref(null);
const stotalCaja = ref(0);
const datacaja = ref([]);
const toolbar = ref(false);
const formCaja = ref({
  saldocaja: 0,
  valor: 0,
  observacion: "",
  tipo: "close",
});

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});
const visculumns = ["amount", "concept", "reference", "user", "created"];
const columns = ref([
  { name: "id", align: "left", label: "Id", field: "id" },
  {
    name: "amount",
    label: "Valor",
    align: "right",
    field: "amount",
    format: (val) => `${formatterPeso.format(val)}`,
    sortable: true,
  },
  {
    name: "concept",
    align: "left",
    label: "Concepto",
    field: "concept",
    sortable: true,
  },
  {
    name: "reference",
    align: "left",
    label: "Referencia",
    field: "reference",
    sortable: true,
  },
  {
    name: "user",
    label: "Usuario",
    align: "left",
    field: (row) => row.expand.user.name,
  },
  { name: "created", label: "Fecha", align: "center", field: "created" },
]);

function cierreCaja() {
  formCaja.value = {
    saldocaja: 0,
    valor: 0,
    observacion: "",
    tipo: "close",
  };
  formCaja.value.saldocaja = stotalCaja.value;
  toolbar.value = true;
}

async function onSubmit() {
  if (formCaja.value.valor >= formCaja.value.saldocaja) {
    $q.notify({
      type: "warning",
      message: "El valor del retiro no puede superar el saldo!",
    });
    formCaja.value.valor = formCaja.value.saldocaja;
  } else {
    if (formCaja.value.valor <= 0) {
      $q.notify({
        type: "warning",
        message: "El valor del retiro debe ser mayor a 0!",
      });
    } else {
      $q.loading.show();
      const fecha = Date.now();
      const ahora = date.formatDate(fecha, "x");
      const data = {
        amount: formCaja.value.valor * -1,
        concept: "Retiro de Caja",
        notes: formCaja.value.observacion,
        reference: `CIER-${ahora}`,
        type: "subtract",
      };
      var result = await crearCaja(data);
      console.log(result);
      $q.notify({
        type: result.type,
        message: result.message,
      });
      loadData();
      toolbar.value = false;
      $q.loading.hide();
    }
  }
}

function refresh() {
  $q.loading.show();
  loadData();
  $q.loading.hide();
}

async function loadData() {
  stotalCaja.value = await totalCaja();
  var datos = await buscarCajas();
  datacaja.value = datos.data.items;
}

onMounted(() => {
  $q.loading.show();
  loadData();
  $q.loading.hide();
});
</script>
