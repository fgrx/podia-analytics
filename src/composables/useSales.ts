import type { IPurchase } from "@/interfaces/purchase";

const allSalesNumber = (purchases: IPurchase[]) => purchases.length;

const salesRevenue = (purchases: IPurchase[]) =>
  purchases.reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesRevenueWithCoupon = (purchases: IPurchase[]) =>
  purchases
    .filter((purchase) => purchase.coupon)
    .reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesNumberWithCoupon = (purchases: IPurchase[]) =>
  purchases.filter((purchase) => purchase.coupon).length;

const salesRevenueWithoutCoupon = (purchases: IPurchase[]) =>
  purchases
    .filter((purchase) => !purchase.coupon)
    .reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesNumberWithoutCoupon = (purchases: IPurchase[]) =>
  purchases.filter((purchase) => !purchase.coupon).length;

export {
  allSalesNumber,
  salesRevenue,
  salesNumberWithCoupon,
  salesRevenueWithCoupon,
  salesRevenueWithoutCoupon,
  salesNumberWithoutCoupon,
};
