import { CheckOutService } from "../../src/services/checkout.service";
import { PRICING_RULES } from "../../src/constants/pricing-rules";
import {
  ProductDescriptions,
  ProductPrices,
  Products,
} from "../../src/enums/commons";
import { CheckOutProduct } from "../../src/models/checkout-product";
import {
  CUSTOM_PRICING_RULES,
  MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER,
} from "./constants/pricing-rules";

describe("CheckOutService - Current Scenarios", () => {
  let checkOutService: CheckOutService;

  beforeEach(() => {
    checkOutService = new CheckOutService(PRICING_RULES);
  });

  describe("scan", () => {
    it("should add products to the shopping cart", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);

      const cartContents = checkOutService.productList;
      expect(cartContents.length).toBe(2);
      expect(cartContents[0]).toEqual<CheckOutProduct>({
        sku: Products.ATV,
        name: ProductDescriptions.ATV,
        price: ProductPrices.ATV,
        quantity: 3,
      });
      expect(cartContents[1]).toEqual<CheckOutProduct>({
        sku: Products.VGA,
        name: ProductDescriptions.VGA,
        price: ProductPrices.VGA,
        quantity: 1,
      });
    });
  });

  describe("cancel", () => {
    it("should remove products from the shopping cart", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);
      checkOutService.cancel();
      const cartContents = checkOutService.productList;
      expect(cartContents.length).toBe(0);
    });
  });

  describe("total", () => {
    it("should calculate the total cost without discounts - scenario 1", () => {
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.VGA);
      checkOutService.scan(Products.VGA);
      checkOutService.scan(Products.VGA);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(ProductPrices.MBP * 4 + ProductPrices.VGA * 3);
    });

    it("should calculate the total cost without discounts - scenario 2", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(ProductPrices.ATV * 2 + ProductPrices.IPD * 4);
    });

    it("should calculate the total cost with discounts - scenario 1", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(249.0);
    });

    it("should calculate the total cost with discounts - scenario 2", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(2718.95);
    });
  });
});

describe("CheckOutService - Future Scenarios", () => {
  let checkOutService: CheckOutService;

  beforeEach(() => {
    checkOutService = new CheckOutService(CUSTOM_PRICING_RULES);
  });

  describe("scan", () => {
    it("should add products to the shopping cart", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);

      const cartContents = checkOutService.productList;
      expect(cartContents.length).toBe(2);
      expect(cartContents[0]).toEqual<CheckOutProduct>({
        sku: Products.ATV,
        name: ProductDescriptions.ATV,
        price: ProductPrices.ATV,
        quantity: 3,
      });
      expect(cartContents[1]).toEqual<CheckOutProduct>({
        sku: Products.VGA,
        name: ProductDescriptions.VGA,
        price: ProductPrices.VGA,
        quantity: 1,
      });
    });

    it("should throw error if products not available in store", () => {
      expect(() => checkOutService.scan("ptavcu")).toThrow(
        "Product not available at the moment"
      );
    });
  });

  describe("cancel", () => {
    it("should remove products from the shopping cart", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);
      checkOutService.cancel();
      const cartContents = checkOutService.productList;
      expect(cartContents.length).toBe(0);
    });
  });

  describe("total", () => {
    it("should return zero if no products added to cart", () => {
      const totalCost = checkOutService.total();
      expect(totalCost).toBe(0);
    });

    it("should calculate the total cost without discounts", () => {
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.MBP);
      checkOutService.scan(Products.VGA);
      checkOutService.scan(Products.VGA);
      checkOutService.scan(Products.VGA);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(ProductPrices.MBP * 4 + ProductPrices.VGA * 3);
    });

    it("should calculate the total cost with discounts - scenario 1", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.VGA);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(318.5);
    });

    it("should calculate the total cost with discounts - scenario 2", () => {
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.IPD);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(2378.96);
    });

    it("should calculate the total cost with discounts except unknown offer - scenario 3", () => {
      checkOutService = new CheckOutService(
        MOCK_PRICING_RULES_WITH_UNKNOWN_OFFER
      );
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.ATV);
      checkOutService.scan(Products.IPD);
      checkOutService.scan(Products.VGA);

      const totalCost = checkOutService.total();
      expect(totalCost).toBe(868.49);
    });
  });
});
