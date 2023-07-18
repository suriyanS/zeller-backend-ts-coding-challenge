import { Offers, Products } from "../enums/commons";
import { Offer } from "../models/offer";

/**
 * Default pricing rule constant with product and offer details
 */
export const PRICING_RULES: Map<string, Offer[]> = new Map();
PRICING_RULES.set(Products.ATV, [
  {
    code: Offers.BUY_X_GET_Y_DISCOUNT,
    percentage: 0,
    discountPrice: 0,
    buyQuantity: 3,
    getQuantity: 2,
    bulkQuantity: 0,
  },
]);
PRICING_RULES.set(Products.IPD, [
  {
    code: Offers.BULK_ORDER_DISCOUNT,
    percentage: 0,
    discountPrice: 499.99,
    buyQuantity: 0,
    getQuantity: 0,
    bulkQuantity: 4,
  },
]);
