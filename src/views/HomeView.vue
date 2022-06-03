<script setup lang="ts">
import { computed, ref } from "vue";
import { parse } from "papaparse";
import type { IPurchase } from "@/interfaces/purchase";

import {
  doughnutSalesNumberConfig,
  doughnutSalesRevenueConfig,
  doughnutRepartitionNumberConfig,
  doughnutRepartitionSalesConfig,
} from "@/composables/useDoughnutChart";

import {
  convertToPurchase,
  findProductsNames,
} from "@/composables/usePurchaseHandler";
import { buildChartBarsConfig } from "@/composables/useLineChart";

import type { ChartData } from "chart.js";
import { LineChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import type { PeriodMode } from "@/interfaces/types";
import type { IPeriod } from "@/interfaces/period";
import dayjs from "dayjs";

Chart.register(...registerables);

const csvFormInput = ref();
const csvFile = ref<File>();
const productsList = ref<Array<string>>();
const targetedProducts = ref<Array<string>>([]);
const periodMode = ref<PeriodMode>("week");
const periodStart = ref<string>("2019-01-01");
const periodEnd = ref<string>(dayjs().format("YYYY-MM-DD"));

const period = computed((): IPeriod => {
  return {
    start: dayjs(periodStart.value),
    end: dayjs(periodEnd.value).endOf("day"),
  };
});

const lineChartData = ref<ChartData>();
const salesNumberDoughnutData = ref();
const salesRevenueDoughnutData = ref();
const salesRepartitionNumberDoughnutData = ref();
const salesRepartitioRevenueDoughnutData = ref();

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
  updateChartAction();
};

const renderLineBar = () => {
  lineChartData.value = buildChartBarsConfig(
    filteredProducts.value as IPurchase[],
    periodMode.value,
    period.value
  );
};

const updateChartAction = () => {
  renderLineBar();

  salesNumberDoughnutData.value = doughnutSalesNumberConfig(
    filteredProducts.value as IPurchase[],
    period.value
  );

  salesRevenueDoughnutData.value = doughnutSalesRevenueConfig(
    filteredProducts.value as IPurchase[],
    period.value
  );

  salesRepartitionNumberDoughnutData.value = doughnutRepartitionNumberConfig(
    filteredProducts.value as IPurchase[],
    period.value
  );

  salesRepartitioRevenueDoughnutData.value = doughnutRepartitionSalesConfig(
    filteredProducts.value as IPurchase[],
    period.value
  );
};
</script>

<template>
  <h1 class="mt-4 text-2xl">Load files</h1>

  <div>
    <form class="my-2" id="csvFormUploader" @submit="loadFileAction($event)">
      <p>
        <label>Upload a CSV File : </label
        ><input type="file" ref="csvFormInput" accept=".csv" />

        <input
          class="px-4 py-2 bg-sky-700 text-white rounded-md"
          type="submit"
          value="submit"
        />
      </p>
    </form>

    <template v-if="productsList">
      <div class="grid grid-cols-1 md:grid-cols-2 my-6">
        <div>
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

        <div>
          <h3 class="text-xl">Display mode</h3>

          <input
            type="radio"
            id="day"
            value="day"
            v-model="periodMode"
            @change="updateChartAction"
          /><label for="day" class="mr-4">Day</label>

          <input
            type="radio"
            id="week"
            value="week"
            v-model="periodMode"
            @change="updateChartAction"
          /><label for="week" class="mr-4">Week</label>

          <input
            type="radio"
            id="week"
            value="month"
            v-model="periodMode"
            @change="updateChartAction"
          /><label for="month" class="mr-4">Month</label>

          <input
            type="radio"
            id="year"
            value="year"
            v-model="periodMode"
            @change="updateChartAction"
          /><label for="year" class="mr-4">Year</label>

          <div class="mt-6">
            <h3 class="text-xl mt-6">Period</h3>
            <input
              type="text"
              class="border-solid border-2 px-4 py-2 rounded-md border-sky-500"
              v-model="periodStart"
              @change="updateChartAction"
              placeholder="2022-01-01"
            />
            to
            <input
              type="text"
              class="border-solid border-2 px-4 py-2 rounded-md border-sky-500"
              v-model="periodEnd"
              @change="updateChartAction"
              placeholder="2022-04-22"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-if="displayTargetedProducts">
      <div class="my-10" v-if="displayTargetedProducts">
        <h2 class="text-3xl text-center">
          charts for "{{ displayTargetedProducts }}"
        </h2>
        <LineChart class="my-6" :chartData="lineChartData" />
      </div>

      <h2 class="text-3xl mt-10 text-center">Coupon vs No coupon</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 text-center">
        <div>
          <h3 class="text-2xl my-4">Sales number</h3>
          <DoughnutChart
            class="my-6"
            :chartData="salesNumberDoughnutData"
          ></DoughnutChart>
        </div>
        <div>
          <h3 class="text-2xl my-4">Sales revenue : coupon vs no coupon</h3>
          <DoughnutChart
            class="my-6"
            :chartData="salesRevenueDoughnutData"
          ></DoughnutChart>
        </div>
      </div>

      <h2 class="text-3xl mt-10 text-center">Sales repartitions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 text-center">
        <div>
          <h3 class="text-2xl my-4">Sales number</h3>
          <DoughnutChart
            class="my-6"
            :chartData="salesRepartitionNumberDoughnutData"
          ></DoughnutChart>
        </div>
        <div>
          <h3 class="text-2xl my-4">Sales revenue : coupon vs no coupon</h3>
          <DoughnutChart
            class="my-6"
            :chartData="salesRepartitioRevenueDoughnutData"
          ></DoughnutChart>
        </div>
      </div>
    </template>
  </div>
</template>
