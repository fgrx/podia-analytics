import {
  salesNumberWithCoupon,
  salesNumberWithoutCoupon,
  salesRevenueWithCoupon,
  salesRevenueWithoutCoupon,
  salesNumberOfAProduct,
  salesRevenueOfAProduct,
} from "@/composables/useSales";
import type { IPeriod } from "@/interfaces/period";
import type { IPurchase } from "@/interfaces/purchase";

const bgColors = [
  "rgb(255, 99, 132)",
  "#7aeb34",
  "#e8c902",
  "#4f9df0",
  "#7d24e3",
  "#f20acb",
];

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
        backgroundColor: bgColors,
      },
    ],
  };
};

const productsUniqueLabel = (products: IPurchase[]): string[] => {
  return [...new Set(products.map((product) => product.summary))];
};

const doughnutRepartitionNumberConfig = (
  purchases: IPurchase[],
  period: IPeriod
) => {
  return {
    labels: productsUniqueLabel(purchases),
    datasets: [
      {
        title: "Products sold repartition",
        data: productsUniqueLabel(purchases).map((product) =>
          salesNumberOfAProduct(purchases, product, period)
        ),
        backgroundColor: bgColors,
      },
    ],
  };
};
const doughnutRepartitionSalesConfig = (
  purchases: IPurchase[],
  period: IPeriod
) => {
  return {
    labels: productsUniqueLabel(purchases),
    datasets: [
      {
        title: "Products Revenue repartition",
        data: productsUniqueLabel(purchases).map((product) =>
          salesRevenueOfAProduct(purchases, product, period)
        ),
        backgroundColor: bgColors,
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
        backgroundColor: bgColors,
      },
    ],
  };
};

export {
  doughnutSalesNumberConfig,
  doughnutSalesRevenueConfig,
  doughnutRepartitionSalesConfig,
  doughnutRepartitionNumberConfig,
};
