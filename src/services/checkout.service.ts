import { STORE_CATALOGUE } from "../constants/store-catalogue";
import { Offers } from "../enums/commons";
import { CheckOutProduct } from "../models/checkout-product";
import { Offer } from "../models/offer";

/**
 * A Service class that represents for product(s) checkout system
 * This class scan the products and calculate the total cost and give discounts
 * based on the offers available
 */
export class CheckOutService {
  public productList: CheckOutProduct[] = [];
  /**
   * Construct new instance for CheckoutService using pricingRules.
   * @param pricingRules - Based on this pricing rule calculation will be done.
   */
  constructor(public pricingRules: Map<string, Offer[]>) {}

  /**
   * Clear all products from the cart
   */
  public cancel(): void {
    this.productList = [];
  }

  /**
   * Scan the products and check the product exist in catalogue.
   * Throws error if the product not available in store catalogue.
   * @param product - product that add to the cart.
   */
  public scan(product: string) {
    const quantity = 1;
    try {
      const existigProduct = this.getProduct(product);
      const existingProductIndex = this.productList.findIndex(
        (p) => p.sku === product
      );

      if (existingProductIndex !== -1) {
        this.productList[existingProductIndex].quantity += quantity;
      } else {
        existigProduct.quantity = quantity;
        this.productList.push(existigProduct);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   *
   * @returns Total cost of products in the cart including offers if any
   */
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

  /**
   * Calculate total discount for the products added in cart
   * @returns Total discount price applied for the products
   */
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
              totalDiscount += this.calculateFixedDiscount(offer);
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

  /**
   * Calculates the percentage based discount
   * @param product - Applicable product
   * @param offer - Offer applicable for the product
   * @returns - Total discount based on offer percentage
   */
  private calculatePercentageDiscount(
    product: CheckOutProduct,
    offer: Offer
  ): number {
    return product.price * product.quantity * (offer.percentage / 100);
  }

  /**
   * Calculates the fixed discount
   * @param offer - Applicable offer
   * @returns - Fixed discount amount
   */
  private calculateFixedDiscount(offer: Offer): number {
    return offer.discountPrice;
  }

  /**
   * Calculate discount based on buy x and get y quantity rule
   * @param product - Applicable product for the offer
   * @param offer - Applicable offer to the product
   * @returns - Total discount applied for the product
   */
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

  /**
   * Calculates bulk order discount for the product
   * @param product - Applicable product for the offer
   * @param offer - Applicable offer for the product
   * @returns - Total bulk order discount applied for the product
   */
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

  /**
   * Calculate sum based on the numbers array
   * @param numbers - numbers array need to sum
   * @returns - Sum of given numbers array
   */
  private calculateTotal(numbers: number[]): number {
    return numbers.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
  }

  /**
   * Get the product details from store catalogue.
   * Throw error if the product not available in store.
   * @param product - product to find in store catalogue.
   * @returns - Product details available in store.
   */
  private getProduct(product: string): CheckOutProduct {
    const existingProduct = STORE_CATALOGUE.get(product);
    if (existingProduct) {
      return existingProduct as CheckOutProduct;
    } else {
      throw new Error("Product not available at the moment");
    }
  }
}
