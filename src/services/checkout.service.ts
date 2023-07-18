import { STORE_CATALOGUE } from "../constants/store-catalogue";
import { Offers } from "../enums/commons";
import { CheckOutProduct } from "../models/checkout-product";
import { Offer } from "../models/offer";

export class CheckOutService {
  private productList: CheckOutProduct[] = [];
  constructor(public pricingRules: Map<string, Offer[]>) {}

  public cancel(): void {
    this.productList = [];
  }

  public scan(sku: string) {
    const quantity = 1;
    const product = this.getProduct(sku);
    const existingProductIndex = this.productList.findIndex(
      (p) => p.sku === sku
    );

    if (existingProductIndex !== -1) {
      this.productList[existingProductIndex].quantity += quantity;
    } else {
      product.quantity = quantity;
      this.productList.push(product);
    }
  }

  public total(): number {
    if (this.productList && this.productList.length > 0) {
      const prices = this.productList.map(
        (product) => product.price * product.quantity
      );
      const totalCost = this.calculateTotal(prices);
      const totalDiscount = this.calculateTotalDiscount();
      return totalCost - totalDiscount;
    }
    return 0;
  }

  private calculateTotalDiscount(): number {
    let totalDiscount = 0;
    for (const product of this.productList) {
      const applicableOffers = this.pricingRules.get(product.sku);
      if (applicableOffers) {
        applicableOffers.forEach((offer) => {
          switch (offer.code) {
            case Offers.PERCENTAGE_DISCOUNT:
              totalDiscount += this.calculatePercentageDiscount(product, offer);
              break;
            case Offers.FIXED_AMOUNT_DISCOUNT:
              totalDiscount += this.calculateFixedDiscount(product, offer);
              break;
            case Offers.BUY_X_GET_Y_DISCOUNT:
              totalDiscount += this.calculateBuyXGetYDiscount(product, offer);
              break;
            case Offers.BULK_ORDER_DISCOUNT:
              totalDiscount += this.calculateBulkOrderDiscount(product, offer);
              break;
            default:
              break;
          }
        });
      }
    }
    return totalDiscount;
  }

  private calculatePercentageDiscount(
    product: CheckOutProduct,
    offer: Offer
  ): number {
    return product.price * product.quantity * (offer.percentage / 100);
  }

  private calculateFixedDiscount(
    product: CheckOutProduct,
    offer: Offer
  ): number {
    return product.price * product.quantity - offer.discountPrice;
  }

  private calculateBuyXGetYDiscount(
    product: CheckOutProduct,
    offer: Offer
  ): number {
    const applicableProductSet = Math.floor(
      product.quantity / offer.buyQuantity
    );
    if (applicableProductSet > 0) {
      const offerPrice =
        applicableProductSet * offer.getQuantity * product.price;
      return product.quantity * product.price - offerPrice;
    }
    return 0;
  }

  private calculateBulkOrderDiscount(
    product: CheckOutProduct,
    offer: Offer
  ): number {
    if (product.quantity > offer.bulkQuantity) {
      return (
        product.quantity * product.price -
        product.quantity * offer.discountPrice
      );
    }
    return 0;
  }

  private calculateTotal(numbers: number[]): number {
    return numbers.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
  }

  private getProduct(sku: string): CheckOutProduct {
    const product = STORE_CATALOGUE.get(sku);
    if (product) {
      return product as CheckOutProduct;
    } else {
      throw new Error("Product not available at the moment");
    }
  }
}
