import type { IPurchase } from "@/interfaces/purchase";
import type { ChartData } from "chart.js";
import dayjs, { Dayjs } from "dayjs";

import {
  updatePeriod,
  dateLabel,
  dateStart,
  dateEnd,
} from "@/composables/useDatesFunctions";
import type { CouponMode, PeriodMode } from "@/interfaces/types";
import type { IPeriod } from "@/interfaces/period";

interface IPurchaseNumber {
  mode: CouponMode;
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
  periodMode: PeriodMode
): IinitializeWeeksData {
  const numberOfPurchases = purchases.length;
  const lastPurchase = purchases[numberOfPurchases - 1];
  const lastDate = dayjs(lastPurchase.date);

  const labels: string[] = [];
  const purchasesNumbersList: IPurchaseNumber[] = [];

  let periodStart = dateEnd;
  let periodEnd = updatePeriod(periodStart, dateEnd, periodMode).dateEnd;

  while (dateStart <= periodStart && lastDate <= periodStart) {
    labels.push(dateLabel(periodStart, periodEnd, periodMode));

    const couponModes: CouponMode[] = ["all", "coupon", "nocoupon"];

    couponModes.forEach((mode) => {
      const nbPurchases: number = getPurchaseNumberByDate(
        periodEnd,
        periodStart,
        purchases,
        mode
      );

      purchasesNumbersList.push({ mode, nbPurchases });
    });

    const nextPeriod = updatePeriod(periodStart, periodEnd, periodMode);
    periodStart = nextPeriod.dateStart;
    periodEnd = nextPeriod.dateEnd;
  }

  return { labels, purchasesNumbers: purchasesNumbersList };
}

export function getPurchaseNumberByDate(
  dateStart: Dayjs,
  dateEnd: Dayjs,
  purchases: IPurchase[],
  mode: CouponMode
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
  periodMode: PeriodMode,
  period: IPeriod
): ChartData {
  const { labels, purchasesNumbers: purchasesNumbers } = initializeData(
    purchases,
    dateStart(periodMode, period.start.format("YYYY-MM-DD")),
    dateEnd(periodMode, period.end.format("YYYY-MM-DD")),
    periodMode
  );

  const data: ChartData = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "All Sales",
        backgroundColor: "#263abd",
        borderColor: "#263abd",

        data: retrievePurchasesByCoupon(purchasesNumbers, "all").reverse(),
      },
      {
        label: "Sales with a coupon",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: retrievePurchasesByCoupon(purchasesNumbers, "coupon").reverse(),
      },
      {
        label: "Sales without coupon",

        backgroundColor: "#7aeb34",
        borderColor: "#7aeb34",
        data: retrievePurchasesByCoupon(purchasesNumbers, "nocoupon").reverse(),
      },
    ],
  };

  return data;
}

const retrievePurchasesByCoupon = (
  purchasesNumbers: IPurchaseNumber[],
  couponMode: CouponMode
): number[] =>
  purchasesNumbers
    .filter((purchases) => purchases.mode === couponMode)
    .map((purchases) => purchases.nbPurchases);
