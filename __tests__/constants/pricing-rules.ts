import { Products, Offers } from "../../src/enums/commons";
import { Offer } from "../../src/models/offer";


export const CUSTOM_PRICING_RULES: Map<string, Offer[]> = new Map();
CUSTOM_PRICING_RULES.set(Products.ATV, [
  {
    code: Offers.FIXED_AMOUNT_DISCOUNT,
    percentage: 0,
    discountPrice: 40,
    buyQuantity: 0,
    getQuantity: 0,
    bulkQuantity: 0,
  },
]);
CUSTOM_PRICING_RULES.set(Products.IPD, [
  {
    code: Offers.PERCENTAGE_DISCOUNT,
    percentage: 20,
    discountPrice: 0,
    buyQuantity: 0,
    getQuantity: 0,
    bulkQuantity: 0,
  },
]);

export const MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER: Map<string, Offer[]> = new Map();
MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER.set(Products.ATV, [
  {
    code: Offers.FIXED_AMOUNT_DISCOUNT,
    percentage: 0,
    discountPrice: 40,
    buyQuantity: 0,
    getQuantity: 0,
    bulkQuantity: 0,
  },
]);
MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER.set(Products.IPD, [
  {
    code: "unknown",
    percentage: 20,
    discountPrice: 0,
    buyQuantity: 0,
    getQuantity: 0,
    bulkQuantity: 0,
  },
]);
