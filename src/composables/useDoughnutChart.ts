import {
  salesNumberWithCoupon,
  salesNumberWithoutCoupon,
  salesRevenueWithCoupon,
  salesRevenueWithoutCoupon,
} from "@/composables/useSales";
import type { IPeriod } from "@/interfaces/period";
import type { IPurchase } from "@/interfaces/purchase";

const doughnutSalesNumberConfig = (purchases: IPurchase[], period: IPeriod) => {
  return {
    labels: ["Number of sales with coupon", "Number of Sales without coupon"],
    datasets: [
      {
        title: "Coupon vs no coupon number",
        data: [
          salesNumberWithCoupon(purchases, period),
          salesNumberWithoutCoupon(purchases, period),
        ],
        backgroundColor: ["rgb(255, 99, 132)", "#7aeb34"],
      },
    ],
  };
};

const doughnutSalesRevenueConfig = (
  purchases: IPurchase[],
  period: IPeriod
) => {
  return {
    labels: ["Revenue with coupon", "Revenue without coupon"],
    datasets: [
      {
        title: "Coupon vs no coupon number",
        data: [
          salesRevenueWithCoupon(purchases, period),
          salesRevenueWithoutCoupon(purchases, period),
        ],
        backgroundColor: ["rgb(255, 99, 132)", "#7aeb34"],
      },
    ],
  };
};

export { doughnutSalesNumberConfig, doughnutSalesRevenueConfig };
