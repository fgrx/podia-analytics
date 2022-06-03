import { describe, it, expect } from "vitest";
import dataSample from "@/composables/__tests__/dataSampleSimple";

import {
  allSalesNumber,
  salesRevenue,
  salesNumberWithCoupon,
  salesRevenueWithCoupon,
  salesRevenueOfAProduct,
  salesNumberOfAProduct,
} from "@/composables/useSales";
import type { IPeriod } from "@/interfaces/period";
import dayjs from "dayjs";

const period: IPeriod = {
  start: dayjs("2022-05-26 "),
  end: dayjs("2022-05-30"),
};

describe(">>>>> useSales composable", () => {
  it("should return all sales number", () => {
    const nbSalesWanted = 5;
    expect(allSalesNumber(dataSample, period)).toBe(nbSalesWanted);
  });

  it("should return all sales money", () => {
    const revenueWanted = 1245;
    expect(salesRevenue(dataSample, period)).toBe(revenueWanted);
  });

  it("should render number of sales with coupon", () => {
    const salesWanted = 2;
    expect(salesNumberWithCoupon(dataSample, period)).toBe(salesWanted);
  });

  it("should render revenue of sales with coupon", () => {
    const salesWanted = 498;
    expect(salesRevenueWithCoupon(dataSample, period)).toBe(salesWanted);
  });

  it("should return the numbers of products sold", () => {
    const soldNumberWanted = 3;
    expect(salesNumberOfAProduct(dataSample, "Atelier 1", period)).toBe(
      soldNumberWanted
    );
  });

  it("should return the product's revenue", () => {
    const revenueWanted = 747;
    expect(salesRevenueOfAProduct(dataSample, "Atelier 1", period)).toBe(
      revenueWanted
    );
  });
});
