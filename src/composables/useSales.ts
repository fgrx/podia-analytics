import type { IPeriod } from "@/interfaces/period";
import type { IPurchase } from "@/interfaces/purchase";
import dayjs from "dayjs";

const allSalesNumber = (purchases: IPurchase[], period: IPeriod) =>
  purchases.filter(
    (purchase) =>
      dayjs(purchase.date).isBefore(period.end) &&
      dayjs(purchase.date).isAfter(period.start)
  ).length;

const salesRevenue = (purchases: IPurchase[], period: IPeriod) =>
  purchases
    .filter(
      (purchase) =>
        dayjs(purchase.date).isBefore(period.end) &&
        dayjs(purchase.date).isAfter(period.start)
    )
    .reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesRevenueWithCoupon = (purchases: IPurchase[], period: IPeriod) =>
  purchases
    .filter((purchase) => purchase.coupon)
    .filter(
      (purchase) =>
        dayjs(purchase.date).isBefore(period.end) &&
        dayjs(purchase.date).isAfter(period.start)
    )
    .reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesNumberWithCoupon = (purchases: IPurchase[], period: IPeriod) =>
  purchases
    .filter(
      (purchase) =>
        dayjs(purchase.date).isBefore(period.end) &&
        dayjs(purchase.date).isAfter(period.start)
    )
    .filter((purchase) => purchase.coupon).length;

const salesRevenueWithoutCoupon = (purchases: IPurchase[], period: IPeriod) =>
  purchases
    .filter((purchase) => !purchase.coupon)
    .filter(
      (purchase) =>
        dayjs(purchase.date).isBefore(period.end) &&
        dayjs(purchase.date).isAfter(period.start)
    )
    .reduce((acc, purchase) => +purchase.revenue.trim() + acc, 0);

const salesNumberWithoutCoupon = (purchases: IPurchase[], period: IPeriod) =>
  purchases
    .filter(
      (purchase) =>
        dayjs(purchase.date).isBefore(period.end) &&
        dayjs(purchase.date).isAfter(period.start)
    )
    .filter((purchase) => !purchase.coupon).length;

export {
  allSalesNumber,
  salesRevenue,
  salesNumberWithCoupon,
  salesRevenueWithCoupon,
  salesRevenueWithoutCoupon,
  salesNumberWithoutCoupon,
};
