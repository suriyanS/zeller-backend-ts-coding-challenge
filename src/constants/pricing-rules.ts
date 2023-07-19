import { Offers, Products } from "../enums/commons";
import { OfferInfo } from "../models/interfaces/offer-info";
import { BulkOffer, QuantityOffer } from "../models/offer";

/**
 * Default pricing rule constant with product and offer details
 */
export const PRICING_RULES: Map<string, OfferInfo[]> = new Map();
PRICING_RULES.set(Products.ATV, [
  {
    code: Offers.BUY_X_GET_Y_DISCOUNT,
    buyQuantity: 3,
    getQuantity: 2,
  } as QuantityOffer,
]);
PRICING_RULES.set(Products.IPD, [
  {
    code: Offers.BULK_ORDER_DISCOUNT,
    discountPrice: 499.99,
    bulkQuantity: 4,
  } as BulkOffer,
]);
