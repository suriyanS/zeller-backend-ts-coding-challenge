import { PRICING_RULES } from "../src/constants/pricing-rules";
import { Products } from "../src/enums/commons";
import { CheckOutService } from "../src/services/checkout.service";

describe("CheckOutService Scenarios", () => {
  let checkOut: CheckOutService;

  beforeEach(() => {
    checkOut = new CheckOutService(PRICING_RULES);
  });

  it("Scenario 1: should calculate total price correctly for multiple ATV purchases", () => {
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.VGA);

    expect(checkOut.total()).toBe(249.00);
  });

  it("Scenario 2: should calculate total price correctly for mixed product purchases", () => {
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.IPD);
    checkOut.scan(Products.IPD);
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.IPD);
    checkOut.scan(Products.IPD);
    checkOut.scan(Products.IPD);

    expect(checkOut.total()).toBe(2718.95);
  });

  it("should reset the total price and product list after canceling", () => {
    checkOut.scan(Products.ATV);
    checkOut.scan(Products.IPD);

    checkOut.cancel();

    expect(checkOut.total()).toBe(0);
    expect(checkOut.productList).toEqual([]);
  });
});
