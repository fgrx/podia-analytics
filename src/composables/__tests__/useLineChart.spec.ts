import { describe, it, expect } from "vitest";

import {
  initializeData,
  getPurchaseNumberByDate,
} from "@/composables/useLineChart";

import dataSample from "@/composables/__tests__/dataSample";
import dayjs from "dayjs";

describe(">>>>>>> useChart composable", () => {
  it("should return the number of purchase found", () => {
    const numberOfPurchasesWanted = 4;

    const dateStart = dayjs("2022-05-27 00:00:01");
    const dateEnd = dayjs("2022-05-29 23:59:59");

    const purchaseNumber = getPurchaseNumberByDate(
      dateStart,
      dateEnd,
      dataSample,
      "all"
    );

    expect(purchaseNumber).toBe(numberOfPurchasesWanted);
  });

  it("should return number of purchases without coupon", () => {
    const numberOfPurchasesWithoutCouponWanted = 1;

    const dateStart = dayjs("2022-05-27 00:00:01");
    const dateEnd = dayjs("2022-05-29 23:59:59");

    const purchaseNumberWithoutCoupon = getPurchaseNumberByDate(
      dateStart,
      dateEnd,
      dataSample,
      "nocoupon"
    );

    expect(purchaseNumberWithoutCoupon).toBe(
      numberOfPurchasesWithoutCouponWanted
    );
  });

  it("should return number of purchases with coupon", () => {
    const dateStart = dayjs("2022-05-27 00:00:01");
    const dateEnd = dayjs("2022-05-29 23:59:59");

    const numberOfPurchasesWithCouponWanted = 3;

    const purchaseNumberWithCoupon = getPurchaseNumberByDate(
      dateStart,
      dateEnd,
      dataSample,
      "coupon"
    );

    expect(purchaseNumberWithCoupon).toBe(numberOfPurchasesWithCouponWanted);
  });

  it("should return chart labels and numbers", () => {
    const numberOfLabelsWanted = 3;
    const purchasesWantedOnFirstElement = 12;

    const results = initializeData(
      dataSample,
      dayjs("2022-05-23"),
      dayjs("2022-05-29 23:59:59"),
      "week"
    );

    expect(results.labels.length).toBe(numberOfLabelsWanted);
    expect(results.purchasesNumbers[0].nbPurchases).toBe(
      purchasesWantedOnFirstElement
    );
  });
});
