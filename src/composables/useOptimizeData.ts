import { titles } from "@/config/titles";
import type { IPurchase } from "@/interfaces/purchase";

const optimizePurchases = (purchases: IPurchase[]): IPurchase[] => {
  return purchases.map((purchase) => {
    titles.forEach((titleItem) => {
      if (titleItem.sameTitles.includes(purchase.summary)) {
        purchase.summary = titleItem.title;
      }
    });
    return purchase;
  });
};

export { optimizePurchases };
