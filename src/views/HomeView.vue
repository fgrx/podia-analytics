<script setup lang="ts">
import { computed, ref } from "vue";
import { parse } from "papaparse";
import type { IPurchase } from "@/interfaces/purchase";

import {
  doughnutSalesNumberConfig,
  doughnutSalesRevenueConfig,
} from "@/composables/useDoughnutChart";

import {
  convertToPurchase,
  findProductsNames,
} from "@/composables/usePurchaseHandler";
import { buildChartBarsConfig } from "@/composables/useLineChart";

import type { ChartData } from "chart.js";
import { LineChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const csvFormInput = ref();
const csvFile = ref<File>();
const productsList = ref<Array<string>>();
const targetedProducts = ref<Array<string>>([]);
const displayMode = ref<"week" | "month">("week");

const lineChartData = ref<ChartData>();
const salesNumberDoughnutData = ref();
const salesRevenueDoughnutData = ref();

const allPurchases = ref<IPurchase[]>();

const displayTargetedProducts = computed(() =>
  targetedProducts.value.toString()
);

const filteredProducts = computed(() => {
  return allPurchases.value?.filter((purchase) =>
    targetedProducts.value.includes(purchase.summary)
  );
});

const loadFileAction = (event: Event) => {
  csvFile.value = csvFormInput.value.files[0] as File;
  parseFile(csvFile.value);
  event.preventDefault();
};

const parseFile = (csvFile: File) => {
  parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const datas = results.data;
      if (Array.isArray(datas)) {
        const purchases = datas.map(convertToPurchase);
        allPurchases.value = purchases;
        productsList.value = findProductsNames(purchases);
      }
    },
  });
};

const updateTargetedProductsAction = (product: string) => {
  if (targetedProducts.value.includes(product)) {
    targetedProducts.value = targetedProducts.value?.filter(
      (item) => product !== item
    );
  } else {
    targetedProducts.value?.push(product);
  }
  renderLineBar();

  salesNumberDoughnutData.value = doughnutSalesNumberConfig(
    filteredProducts.value as IPurchase[]
  );

  salesRevenueDoughnutData.value = doughnutSalesRevenueConfig(
    filteredProducts.value as IPurchase[]
  );

  console.log(salesNumberDoughnutData.value);
};

const renderLineBar = () => {
  const dataForBarChart = buildChartBarsConfig(
    filteredProducts.value as IPurchase[],
    displayMode.value
  );
  lineChartData.value = dataForBarChart;
};

const updateChartAction = () => {
  renderLineBar();
};
</script>

<template>
  <h1 class="mt-4 text-2xl">Load files</h1>

  <div>
    <form class="my-2" id="csvFormUploader" @submit="loadFileAction($event)">
      <p>
        <label>Upload a CSV File : </label
        ><input type="file" ref="csvFormInput" accept=".csv" />
      </p>
      <p>
        <input
          class="px-4 py-2 bg-black text-white"
          type="submit"
          value="submit"
        />
      </p>
    </form>

    <template v-if="productsList">
      <div class="my-6">
        <h2 class="text-xl">Choose products for chart rendering</h2>
        <ul>
          <li v-for="atelier in productsList">
            <input
              type="checkbox"
              @click="updateTargetedProductsAction(atelier)"
            />
            {{ atelier }}
          </li>
        </ul>
      </div>

      <div class="my-6">
        <h3 class="text-xl">Display mode</h3>

        <input
          type="radio"
          id="week"
          value="week"
          v-model="displayMode"
          @change="updateChartAction"
        /><label for="week" class="mr-4">Week</label>
        <input
          type="radio"
          id="week"
          value="month"
          v-model="displayMode"
          @change="updateChartAction"
        /><label for="month">Month</label>
      </div>
    </template>

    <div class="my-10" v-if="displayTargetedProducts">
      <h2 class="text-3xl">charts for "{{ displayTargetedProducts }}"</h2>
      <LineChart class="my-6" :chartData="lineChartData" />

      <h2 class="text-3xl">Sales number : coupon vs no coupon</h2>
      <DoughnutChart
        class="my-6"
        :chartData="salesNumberDoughnutData"
      ></DoughnutChart>

      <h2 class="text-3xl">Sales revenue : coupon vs no coupon</h2>
      <DoughnutChart
        class="my-6"
        :chartData="salesRevenueDoughnutData"
      ></DoughnutChart>
    </div>
  </div>
</template>
