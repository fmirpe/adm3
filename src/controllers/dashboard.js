import { getCashs } from "src/api/cash";
import { getSales } from "src/api/pos";
import { date } from "quasar";

export async function totalCaja() {
  var result = (await getCashs()).data;
  var suma = 0;
  result.items.forEach((obj) => {
    suma += obj.amount;
  });
  return suma;
}

export async function totalVentas() {
  const timeStamp = Date.now();
  const fini = date.formatDate(timeStamp, "YYYY-MM-DD 00:00:00");
  const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
  var result = (await getSales(`created >= '${fini}'`, "", false, 1, 1000))
    .data;
  var suma = 0;
  result.items.forEach((obj) => {
    suma += obj.total;
  });
  return suma;
}

export async function ventasUltimaSemana() {
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  const timeStamp = Date.now();
  const fini = date.formatDate(
    date.subtractFromDate(timeStamp, { days: 8 }),
    "YYYY-MM-DD 00:00:00"
  );
  const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
  var result = await getSales(
    `created>='${fini}' && created<='${ffin}'`,
    "",
    true,
    1,
    1000
  );
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  var categories = [];
  var series = [];
  for (const item of dias) {
    categories.push(item);
    series.push(0);
  }
  for (const item of result.data.items) {
    const numeroDia = new Date(item.created).getDay();
    series[numeroDia] += item.total;
  }
  console.log(series);
  console.log(categories);
  return {
    options: {
      chart: {
        id: "ventasUltimaSemana",
      },
      xaxis: {
        categories: [...categories],
        lables: {
          formatter: function (value) {
            return formatterPeso.format(value);
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return formatterPeso.format(value);
          },
        },
      },
      title: {
        text: "Ventas Ultima Semana",
      },
    },
    series: [
      {
        name: "Ventas",
        data: [...series],
      },
    ],
  };
}

export async function redimientosUltimaSemana() {
  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  const timeStamp = Date.now();
  const fini = date.formatDate(
    date.subtractFromDate(timeStamp, { days: 8 }),
    "YYYY-MM-DD 00:00:00"
  );
  const ffin = date.formatDate(timeStamp, "YYYY-MM-DD 23:59:59");
  var result = await getSales(
    `created>='${fini}' && created<='${ffin}'`,
    "",
    true,
    1,
    1000
  );
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  var categories = [];
  var series = [];
  var seriescredito = [];
  for (const item of dias) {
    categories.push(item);
    series.push(0);
    seriescredito.push(0);
  }
  for (const item of result.data.items) {
    const numeroDia = new Date(item.created).getDay();
    series[numeroDia] += item.sale_type == "Contado" ? item.total : 0;
    seriescredito[numeroDia] += item.sale_type == "Credito" ? item.total : 0;
  }
  return {
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "25%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [...categories],
      },
      yaxis: {
        title: {
          text: "$ (Pesos)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return formatterPeso.format(val);
          },
        },
      },
    },
    series: [
      {
        name: "Contado",
        data: [...series],
      },
      {
        name: "Crédito",
        data: [...seriescredito],
      },
    ],
  };
}
