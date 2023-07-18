/**
 * An enum that represents all product sku's code.
 * Add new product(s) here.
 */
export enum Products {
    IPD = "ipd",
    MBP = "mbp",
    ATV = "atv",
    VGA = "vga"
}

/**
 * An enum that represents all product's description.
 * Add product descriptions here.
 */
export enum ProductDescriptions {
    IPD = "Super iPad",
    MBP = "MacBook Pro",
    ATV = "Apple TV",
    VGA = "VGA adapter"
}

/**
 * An enum that represents all product's price.
 * Add product prices here.
 */
export enum ProductPrices {
    IPD = 549.99,
    MBP = 1399.99,
    ATV = 109.50,
    VGA = 30.00
}

/**
 * An enum that represents all offers.
 * Add new offer(s) here.
 */
export enum Offers {
    PERCENTAGE_DISCOUNT = "PERCENTAGE_DISCOUNT",
    FIXED_AMOUNT_DISCOUNT = "FIXED_AMOUNT_DISCOUNT",
    BUY_X_GET_Y_DISCOUNT = "BUY_X_GET_Y_DISCOUNT",
    BULK_ORDER_DISCOUNT = "BULK_ORDER_DISCOUNT",
}