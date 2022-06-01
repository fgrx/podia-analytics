import type { IPurchase } from "@/interfaces/purchase";
import type { ChartData } from "chart.js";
import dayjs, { Dayjs } from "dayjs";

import {
  lastDayOfTheWeek,
  firstDayOfTheWeek,
  updatePeriod,
  firstDayOfMonth,
  lastDayOfMonth,
  dateLabel,
} from "@/composables/useDatesFunctions";

type Mode = "all" | "coupon" | "nocoupon";

interface IPurchaseNumber {
  mode: Mode;
  nbPurchases: number;
}

interface IinitializeWeeksData {
  labels: string[];
  purchasesNumbers: IPurchaseNumber[];
}

export function initializeData(
  purchases: IPurchase[],
  dateStart: Dayjs,
  dateEnd: Dayjs,
  displayMode: "week" | "month"
): IinitializeWeeksData {
  const numberOfPurchases = purchases.length;
  const lastPurchase = purchases[numberOfPurchases - 1];
  const lastDate = dayjs(lastPurchase.date);

  const labels: string[] = [];

  const purchasesNumbersList: IPurchaseNumber[] = [];

  while (lastDate <= dateEnd) {
    labels.push(dateLabel(dateStart, dateEnd, displayMode));

    const modes: Mode[] = ["all", "coupon", "nocoupon"];

    modes.forEach((mode) => {
      const nbPurchases: number = getPurchaseNumberByDate(
        dateStart,
        dateEnd,
        purchases,
        mode
      );

      purchasesNumbersList.push({ mode, nbPurchases });
    });

    const nextPeriod = updatePeriod(dateStart, dateEnd, displayMode);
    dateStart = nextPeriod.dateStart;
    dateEnd = nextPeriod.dateEnd;
  }

  return { labels, purchasesNumbers: purchasesNumbersList };
}

export function getPurchaseNumberByDate(
  dateStart: Dayjs,
  dateEnd: Dayjs,
  purchases: IPurchase[],
  mode: Mode
): number {
  let cptPurchases = 0;

  purchases.forEach((purchase) => {
    const datePurchase = dayjs(purchase.date);

    if (datePurchase.isAfter(dateStart) && datePurchase.isBefore(dateEnd)) {
      switch (mode) {
        case "coupon":
          if (purchase.coupon) cptPurchases++;
          break;

        case "nocoupon":
          if (!purchase.coupon) cptPurchases++;
          break;

        default:
          cptPurchases++;
          break;
      }
    }
  });

  return cptPurchases;
}

export function buildChartBarsConfig(
  purchases: IPurchase[],
  displayMode: "week" | "month"
): ChartData {
  const dateStart =
    displayMode === "month" ? firstDayOfMonth(new Date()) : firstDayOfTheWeek();
  const dateEnd =
    displayMode === "month" ? lastDayOfMonth(new Date()) : lastDayOfTheWeek();

  const { labels, purchasesNumbers: purchasesNumbers } = initializeData(
    purchases,
    dateStart,
    dateEnd,
    displayMode
  );

  const data: ChartData = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "All Sales",
        backgroundColor: "#263abd",
        borderColor: "#263abd",

        data: retrievePurchasesByMode(purchasesNumbers, "all").reverse(),
      },
      {
        label: "Sales with a coupon",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: retrievePurchasesByMode(purchasesNumbers, "coupon").reverse(),
      },
      {
        label: "Sales without coupon",

        backgroundColor: "#7aeb34",
        borderColor: "#7aeb34",
        data: retrievePurchasesByMode(purchasesNumbers, "nocoupon").reverse(),
      },
    ],
  };

  return data;
}

const retrievePurchasesByMode = (
  purchasesNumbers: IPurchaseNumber[],
  mode: Mode
): number[] =>
  purchasesNumbers
    .filter((purchases) => purchases.mode === mode)
    .map((purchases) => purchases.nbPurchases);
