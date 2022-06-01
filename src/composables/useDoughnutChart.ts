import {
  salesNumberWithCoupon,
  salesNumberWithoutCoupon,
  salesRevenueWithCoupon,
  salesRevenueWithoutCoupon,
} from "@/composables/useSales";
import type { IPurchase } from "@/interfaces/purchase";

const doughnutSalesNumberConfig = (purchases: IPurchase[]) => {
  return {
    labels: ["Number of sales with coupon", "Number of Sales without coupon"],
    datasets: [
      {
        title: "Coupon vs no coupon number",
        data: [
          salesNumberWithCoupon(purchases),
          salesNumberWithoutCoupon(purchases),
        ],
        backgroundColor: ["rgb(255, 99, 132)", "#7aeb34"],
      },
    ],
  };
};

const doughnutSalesRevenueConfig = (purchases: IPurchase[]) => {
  return {
    labels: ["Revenue with coupon", "Revenue without coupon"],
    datasets: [
      {
        title: "Coupon vs no coupon number",
        data: [
          salesRevenueWithCoupon(purchases),
          salesRevenueWithoutCoupon(purchases),
        ],
        backgroundColor: ["rgb(255, 99, 132)", "#7aeb34"],
      },
    ],
  };
};

export { doughnutSalesNumberConfig, doughnutSalesRevenueConfig };
