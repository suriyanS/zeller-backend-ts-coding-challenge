import { OfferInfo } from "./interfaces/offer-info";

/**
 * A class that represents the common offer details that covers all offers at the moment
 */
export class Offer implements OfferInfo {
  code: string;
  percentage: number;
  discountPrice: number;
  buyQuantity: number;
  getQuantity: number;
  bulkQuantity: number;

  constructor(
    code: string,
    percentage: number,
    discountPrice: number,
    buyQuantity: number,
    getQuantity: number,
    bulkQuantity: number
  ) {
    this.code = code;
    this.percentage = percentage;
    this.discountPrice = discountPrice;
    this.buyQuantity = buyQuantity;
    this.getQuantity = getQuantity;
    this.bulkQuantity = bulkQuantity;
  }
}
