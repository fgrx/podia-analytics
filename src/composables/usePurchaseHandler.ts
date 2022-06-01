import type { IPurchase } from "@/interfaces/purchase";

const convertToPurchase = (element: any): IPurchase => {
  return {
    date: element.Date,
    coupon: element.Coupon,
    revenue: element.Revenue,
    summary: element.Summary,
  };
};

const findProductsNames = (purchases: IPurchase[]): Array<string> => {
  const productsList: Array<string> = [];

  purchases.forEach((purchase) => {
    if (!productsList.includes(purchase.summary))
      productsList.push(purchase.summary);
  });

  return productsList;
};

export { convertToPurchase, findProductsNames, parsePurchaseFile };
