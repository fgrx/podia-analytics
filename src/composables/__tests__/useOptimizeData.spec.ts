import { describe, expect, it } from "vitest";
import { optimizePurchases } from "@/composables/useOptimizeData";
import type { IPurchase } from "@/interfaces/purchase";
import { titles } from "@/config/titles";

const purchasesSample: IPurchase[] = [
  {
    date: "2022-05-29 18:29:33",
    coupon: "CONTRETRANSFERTLETTREPSY (30.00EUR)",
    revenue: " 249.00",
    summary: "Comprendre et faire la paix avec son héritage familial",
  },
  {
    date: "2022-05-29 18:07:37",
    coupon: "CONTRETRANSFERTLETTREPSY (30.00EUR)",
    revenue: " 249.00",
    summary: "Atelier 1",
  },
  {
    date: "2022-05-29 17:31:41",
    coupon: "",
    revenue: " 249.00",
    summary: "Construire et interpréter son héritage familial",
  },
  {
    date: "2022-05-28 17:31:41",
    coupon: "",
    revenue: " 249.00",
    summary: "Faire la paix avec votre héritage familial",
  },
];

describe(">>>> useOptimizeData", () => {
  it("should replace all occurences", () => {
    expect(optimizePurchases(purchasesSample)[0].summary).toBe(titles[0].title);
  });
});
