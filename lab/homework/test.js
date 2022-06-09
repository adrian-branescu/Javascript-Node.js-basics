import { expect } from "chai";
import {
  Product,
  Aliment,
  Customer,
  seeIfExpired,
  seeIfCustomerCanAfford,
  ProductError,
  seeIfEmpty,
  seeIfFraud,
} from "./index.js";

describe("seeIfExpired", () => {
  it("should throw error if product is expired", () => {
    expect(() =>
      seeIfExpired(new Aliment("paine", 1.5, new Date("1/1/2012"), 150))
    ).to.throw(ProductError);
  });
  it("should add to cart if product is not expired", () => {
    expect(seeIfExpired(new Aliment("paine", 1.5, new Date("1/1/2023"), 150)))
      .to.be.true;
  });
});
describe("seeIfCustomerCanAfford", () => {
  it("should throw error if customer can't afford", () => {
    let p1 = new Product("product1", 15.5);
    let p2 = new Product("product2", 5.95);
    let customer = new Customer("Relu", 10.13);
    customer.addToCart(p1);
    customer.addToCart(p2);
    expect(() => seeIfCustomerCanAfford(customer)).to.throw(ProductError);
  });
});
describe("seeIfEmpty", () => {
  it("should return true if cart is empty", () => {
    let p1 = new Product("product1", 15.5);
    let p2 = new Product("product2", 5.95);
    let customer = new Customer("Relu", 99.13);
    customer.addToCart(p1);
    customer.addToCart(p2);
    expect(seeIfEmpty(customer)).to.be.true;
  });
});

describe("seeIfFraud", () => {
  it("should return true if cashier declares all cash paid by customer", () => {
    let p1 = new Product("product1", 15.5);
    let p2 = new Product("product2", 5.95);
    let customer = new Customer("Relu", 99.13);
    customer.addToCart(p1);
    customer.addToCart(p2);
    expect(seeIfFraud(customer)).to.be.true;
  });
});
