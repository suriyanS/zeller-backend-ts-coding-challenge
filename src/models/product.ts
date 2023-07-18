import { ProductInfo } from "./interfaces/product-info";

/**
 * A class that represents product details with basic information
 */
export class Product implements ProductInfo {
  sku: string;
  name: string;
  price: number;
  constructor(sku: string, name: string, price: number) {
    this.sku = sku;
    this.name = name;
    this.price = price;
  }
}