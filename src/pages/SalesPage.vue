<template>
  <div class="q-pa-md">
    <q-table
      title="Ventas del día"
      :rows="datos"
      :columns="columns"
      row-key="id"
      :visible-columns="visculumns"
      :filter="filter"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <div class="q-pr-md">
          <q-btn
            color="primary"
            icon-right="archive"
            label="Exportar a csv"
            no-caps
            @click="exportTable"
            rounded
          />
        </div>
        <div>
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
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id_customer" :props="props">
            {{ props.row.expand.id_customer.name }}
          </q-td>
          <q-td key="subtotal" :props="props">
            <q-badge rounded color="primary">
              {{ formatterPeso.format(props.row.subtotal) }}
            </q-badge>
          </q-td>
          <q-td key="sale_type" :props="props">
            <q-badge
              rounded
              v-if="props.row.sale_type == 'Contado'"
              color="positive"
            >
              {{ props.row.sale_type }}
            </q-badge>
            <q-badge
              rounded
              v-if="props.row.sale_type == 'Credito'"
              color="warning"
            >
              {{ props.row.sale_type }}
            </q-badge>
          </q-td>
          <q-td key="total" :props="props">
            <q-badge rounded color="green">
              {{ formatterPeso.format(props.row.total) }}
            </q-badge>
          </q-td>

          <q-td key="user" :props="props">
            {{ props.row.expand.user.name }}
          </q-td>
          <q-td key="created" :props="props">
            {{ date.formatDate(props.row.created, "YYYY-MM-DD HH:mm") }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row>
        <q-tr>
          <q-td> <div class="text-h6">Total</div> </q-td>
          <q-td class="text-right">
            <div class="text-h6 text-secondary">
              {{ formatterPeso.format(totalventa) }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar, date, exportFile } from "quasar";
import { todasVentas } from "src/controllers/sales";

const $q = useQuasar();
const filter = ref(null);
const datos = ref([]);
const totalventa = ref(0);

const visculumns = [
  "id_customer",
  "subtotal",
  "sale_type",
  "total",
  "user",
  "created",
];

const initialPagination = ref({
  rowsPerPage: 10,
});

const columns = ref([
  { name: "id", align: "left", label: "Id", field: "id" },
  {
    name: "id_customer",
    align: "left",
    label: "Cliente",
    field: "id_customer",
    field: (row) => row.expand.id_customer.name,
    sortable: true,
  },
  {
    name: "subtotal",
    label: "Sub total",
    align: "right",
    field: "subtotal",
    format: (val) => `${formatterPeso.format(val)}`,
    sortable: true,
  },
  {
    name: "sale_type",
    align: "left",
    label: "Tipo",
    field: "sale_type",
    sortable: true,
  },
  {
    name: "total",
    label: "Total",
    align: "right",
    field: "total",
    format: (val) => `${formatterPeso.format(val)}`,
    sortable: true,
  },
  {
    name: "user",
    label: "Vendedor",
    align: "left",
    field: (row) => row.expand.user.name,
    sortable: true,
  },
  {
    name: "created",
    label: "Fecha",
    align: "center",
    field: "created",
    format: (val) => `${date.formatDate(val, "YYYY-MM-DD HH:mm")}`,
    sortable: true,
  },
]);

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

function exportTable() {
  // naive encoding to csv format
  const content = [columns.value.map((col) => wrapCsvValue(col.label))]
    .concat(
      datos.value.map((row) =>
        columns.value
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile("table-export.csv", content, "text/csv");

  if (status !== true) {
    $q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
}

async function loadData() {
  var result = await todasVentas();
  datos.value = result.data.items;
  datos.value.forEach((obj) => {
    totalventa.value += obj.total;
  });
}

onMounted(() => {
  $q.loading.show();
  loadData();
  $q.loading.hide();
});
</script>
