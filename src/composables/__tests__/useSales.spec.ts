import { describe, it, expect } from "vitest";
import dataSample from "@/composables/__tests__/dataSampleSimple";

import {
  allSalesNumber,
  salesRevenue,
  salesNumberWithCoupon,
  salesRevenueWithCoupon,
} from "@/composables/useSales";

describe(">>>>> useSales composable", () => {
  it("should return all sales number", () => {
    const nbSalesWanted = 5;
    expect(allSalesNumber(dataSample)).toBe(nbSalesWanted);
  });

  it("should return all sales money", () => {
    const revenueWanted = 1245;
    expect(salesRevenue(dataSample)).toBe(revenueWanted);
  });

  it("should render number of sales with coupon", () => {
    const salesWanted = 2;
    expect(salesNumberWithCoupon(dataSample)).toBe(salesWanted);
  });

  it("should render revenue of sales with coupon", () => {
    const salesWanted = 498;
    expect(salesRevenueWithCoupon(dataSample)).toBe(salesWanted);
  });
});
