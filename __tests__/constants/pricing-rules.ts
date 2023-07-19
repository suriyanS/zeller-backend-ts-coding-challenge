import { Products, Offers } from "../../src/enums/commons";
import { OfferInfo } from "../../src/models/interfaces/offer-info";

/**
 * A constant that represents custom pricing rule for future scenarios test
 */
export const CUSTOM_PRICING_RULES: Map<string, OfferInfo[]> = new Map();
CUSTOM_PRICING_RULES.set(Products.ATV, [
  {
    code: Offers.FIXED_AMOUNT_DISCOUNT,
    percentage: 0,
    discountPrice: 40,
  },
]);
CUSTOM_PRICING_RULES.set(Products.IPD, [
  {
    code: Offers.PERCENTAGE_DISCOUNT,
    percentage: 20,
    discountPrice: 0,
  },
]);

/**
 * A constant that represents mock pricing rule includes unknown offer for test
 */
export const MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER: Map<string, OfferInfo[]> =
  new Map();
MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER.set(Products.ATV, [
  {
    code: Offers.FIXED_AMOUNT_DISCOUNT,
    percentage: 0,
    discountPrice: 40,
  },
]);
MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER.set(Products.IPD, [
  {
    code: "unknown",
    percentage: 20,
    discountPrice: 0,
  },
]);
