import { OfferInfo } from "./interfaces/offer-info";

/**
 * A class that represents the common offer details that covers basic offers
 */
export class BaseOffer implements OfferInfo {
  code: string;
  percentage: number;
  discountPrice: number;
  constructor(code: string, percentage: number, discountPrice: number) {
    this.code = code;
    this.percentage = percentage;
    this.discountPrice = discountPrice;
  }
}

/**
 * A class that represents Quantity Offer includes basic offer details
 */
export class QuantityOffer extends BaseOffer {
  buyQuantity: number;
  getQuantity: number;

  constructor(
    code: string,
    percentage: number,
    discountPrice: number,
    buyQuantity: number,
    getQuantity: number
  ) {
    super(code, percentage, discountPrice);
    this.buyQuantity = buyQuantity;
    this.getQuantity = getQuantity;
  }
}

/**
 * A class that represents bulk offer including base offer details
 */
export class BulkOffer extends BaseOffer {
  bulkQuantity: number;
  constructor(
    code: string,
    percentage: number,
    discountPrice: number,
    bulkQuantity: number
  ) {
    super(code, percentage, discountPrice);
    this.bulkQuantity = bulkQuantity;
  }
}
