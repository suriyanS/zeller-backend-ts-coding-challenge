import { ProductInfo } from "./interfaces/product-info";

/**
 * A class that represents for product checkout with quantity
 */
export class CheckOutProduct implements ProductInfo {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    constructor(sku: string, name: string, price: number, quantity: number) {
      this.sku = sku;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
  }