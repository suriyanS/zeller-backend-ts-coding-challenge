import {
  Products,
  ProductDescriptions,
  ProductPrices,
} from "../enums/commons";
import { Product } from "../models/product";

export const STORE_CATALOGUE: Map<string, Product> = new Map();
STORE_CATALOGUE.set(Products.IPD, {
  sku: Products.IPD,
  name: ProductDescriptions.IPD,
  price: ProductPrices.IPD
});
STORE_CATALOGUE.set(Products.MBP, {
  sku: Products.MBP,
  name: ProductDescriptions.MBP,
  price: ProductPrices.MBP
});
STORE_CATALOGUE.set(Products.ATV, {
  sku: Products.ATV,
  name: ProductDescriptions.ATV,
  price: ProductPrices.ATV
});
STORE_CATALOGUE.set(Products.VGA, {
  sku: Products.VGA,
  name: ProductDescriptions.VGA,
  price: ProductPrices.VGA
});
