"use strict";

class ProductError extends Error {
  static ERROR_CODE = {
    EXPIRED_PRODUCT: "EXPIRED_PRODUCT",
    PRODUCT_EXCEEDS_BALANCE: "PRODUCT_EXCEEDS_BALANCE",
  };
  static ERROR_MESSAGE = {
    [ProductError.ERROR_CODE.EXPIRED_PRODUCT]:
      "You can't buy expired products!",
    [ProductError.ERROR_CODE.PRODUCT_EXCEEDS_BALANCE]:
      "You can't afford this product!",
  };
  constructor({ code, message = ProductError.ERROR_MESSAGE[code], data }) {
    super(message);
    this.code = code;
    this.data = data;
  }
  toString() {
    return JSON.stringify({
      code: this.code,
      message: this.message,
      data: this.data,
    });
  }
}

class Product {
  #name;
  #price;
  constructor(name, price) {
    this.#name = name;
    this.#price = price;
  }
  get name() {
    return this.#name;
  }
  get price() {
    return this.#price;
  }
}

class Aliment extends Product {
  #expirationDate;
  #grammage;
  constructor(name, price, expirationDate, grammage) {
    super(name, price);
    this.#expirationDate = expirationDate;
    this.#grammage = grammage;
  }
  get expirationDate() {
    return this.#expirationDate;
  }
  get grammage() {
    return this.#grammage;
  }
}
class Furniture extends Product {
  #color;
  constructor(name, price, color) {
    super(name, price);
    this.#color = color;
  }
  get color() {
    return this.#color;
  }
}
class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
}

class Customer extends Person {
  #money;
  #shoppingCart;
  constructor(name, money) {
    super(name);
    this.#money = money;
    this.#shoppingCart = [];
  }
  addToCart(product) {
    if (product.expirationDate - new Date() < 0)
      throw new ProductError({
        code: ProductError.ERROR_CODE.EXPIRED_PRODUCT,
        data: {
          expirationDate: product.expirationDate,
          currentDate: new Date(),
        },
      });
    this.#shoppingCart.push(product);
  }
  removeFromCart(product) {
    this.#shoppingCart = this.#shoppingCart.filter((p) => p !== product);
  }
  get money() {
    return this.#money;
  }
  get shoppingCart() {
    return this.#shoppingCart;
  }
  set money(money) {
    this.#money = money;
  }
}

class Cashier extends Person {
  #totalSales;
  constructor(name) {
    super(name);
    this.#totalSales = 0;
  }
  scanAndCash(customer) {
    let totalOwed = 0;
    for (let product of customer.shoppingCart) {
      totalOwed += product.price;
      if (totalOwed > customer.money)
        throw new ProductError({
          code: ProductError.ERROR_CODE.PRODUCT_EXCEEDS_BALANCE,
          data: {
            customerBalance: customer.money,
            amountOwedCurrently: totalOwed - product.price,
            productPrice: product.price,
          },
        });
    }
    customer.money = customer.money - totalOwed;
    customer.shoppingCart.splice(0, customer.shoppingCart.length);
    this.#totalSales += totalOwed;
  }
  get totalSales() {
    return this.#totalSales;
  }
}

function seeIfExpired(expProduct) {
  let customer = new Customer("Relu", 21.5);
  customer.addToCart(expProduct);
  return true;
}

function seeIfCustomerCanAfford(customer) {
  let cashier = new Cashier("Cashier1");
  cashier.scanAndCash(customer);
  return true;
}
function seeIfEmpty(customer) {
  let cashier = new Cashier("AnotherCashier");
  cashier.scanAndCash(customer);
  if (customer.shoppingCart.length === 0) return true;
  return false;
}
function seeIfFraud(customer) {
  let cashier = new Cashier("AnotherCashier");
  let totalPaidByCustomer = 0;
  for (let product of customer.shoppingCart) {
    totalPaidByCustomer += product.price;
  }
  cashier.scanAndCash(customer);
  if (cashier.totalSales === totalPaidByCustomer) return true;
  return false;
}

export {
  Product,
  Aliment,
  Customer,
  seeIfExpired,
  seeIfCustomerCanAfford,
  ProductError,
  seeIfEmpty,
  seeIfFraud,
};
