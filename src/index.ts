import { PRICING_RULES } from "./constants/pricing-rules";
import { Products } from "./enums/commons";
import { CheckOutService } from "./services/checkout.service";

const checkOut = new CheckOutService(PRICING_RULES);
checkOut.scan(Products.ATV);
checkOut.scan(Products.ATV);
checkOut.scan(Products.ATV);
checkOut.scan(Products.VGA);
console.log("Scenario 1: Total Price: $" + checkOut.total());

checkOut.cancel();

checkOut.scan(Products.ATV);
checkOut.scan(Products.IPD);
checkOut.scan(Products.IPD);
checkOut.scan(Products.ATV);
checkOut.scan(Products.IPD);
checkOut.scan(Products.IPD);
checkOut.scan(Products.IPD);
console.log("Scenario 2: Total Price: $" + checkOut.total());
