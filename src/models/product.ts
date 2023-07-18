import { ProductInfo } from "./interfaces/product-info";

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