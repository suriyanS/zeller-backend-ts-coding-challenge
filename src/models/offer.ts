import { OfferInfo } from "./interfaces/offer-info";

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
