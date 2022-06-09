'use strict';

class ShopError extends Error {
    
    static ERROR_CODE = {
        EXPIRED_ALIMENT: 'EXPIRED_ALIMENT',
        NOT_ENOUGH_FUNDS: 'NOT_ENOUGH_FUNDS'
    };

    static ERROR_MESSAGE = {
        [ShopError.ERROR_CODE.EXPIRED_ALIMENT]: 'Customer can not add an expired aliment to their shopping cart.',
        [ShopError.ERROR_CODE.NOT_ENOUGH_FUNDS]: 'Customer does not have enough funds to pay for all their products.'
    };

    constructor({ code, message = ShopError.ERROR_MESSAGE[code], data}) {
        super(message);

        this.code = code;
        this.data = data;
    }

    toString() {

        return JSON.stringify({
            code: this.code,
            message: this.message,
            data: this.data
        });
    }

}


class Person {
    constructor(name) {
        this.name = name;
    }

}

class Customer extends Person {

    constructor(name, money) {
        super(name);
        this.money = money;
        this.shoppingCart = [];
    }

    addToCart(product) {
        let currentDate = new Date();
        if (product.expirationDate < currentDate) {
            throw new ShopError({
                code: ShopError.ERROR_CODE.EXPIRED_ALIMENT,
                data: {
                    expirationDate: product.expirationDate,
                    currentDate: currentDate
                }
            });
        }

        this.shoppingCart.push(product);
    }

    removeFromCart(product) {
        let indexOfProduct = this.shoppingCart.indexOf(product);

        if (index != -1) {
            this.shoppingCart.splice(indexOfProduct, 1);
        }
    }

}

class Cashier extends Person {

    constructor(name, totalSales) {
        super(name);
        this.totalSales = totalSales;
    }

    scanAndCash(customer) {
        let sumToPay = 0;
        
        for (let product of customer.shoppingCart) {
            sumToPay += product.price;
        }

        if (sumToPay > customer.money) {

            throw new ShopError({
                code: ShopError.ERROR_CODE.NOT_ENOUGH_FUNDS,
                data: {
                    customerName: customer.name,
                    funds: customer.money,
                    needToPay: sumToPay
                }
            });
        }

        customer.shoppingCart = [];
        customer.money -= sumToPay;
        this.totalSales += sumToPay;   
    }
}

class Product {

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

}

class Aliments extends Product {

    constructor(name, price, expirationDate, grammage) {
        super(name, price);
        this.expirationDate = expirationDate;
        this.grammage = grammage;
    }

}

class Furniture extends Product {

    constructor(name, price, color) {
        super(name, price);
        this.color = color;
    }

}

function addProductTest(product) {
    var testCustomer = new Customer('Test', 100);
    testCustomer.addToCart(product);
    return true;
}

function fundsTest(customer) {
    var testCashier = new Cashier('testCashier', 0);
    var testProduct = new Furniture('testFurniture', 30, 'testColor');

    for (let i = 0; i < 3; i++) {
        customer.addToCart(testProduct);
    }

    testCashier.scanAndCash(customer);

    return testCashier.totalSales;
}

function emptyCartTest(customer) {
    var testCashier = new Cashier('testCashier', 0);
    
    testCashier.scanAndCash(customer);

    return customer.shoppingCart.length;
}

function paymentTest(customer) {
    var testCashier = new Cashier('testCashier', 0);
    
    testCashier.scanAndCash(customer);

    return testCashier.totalSales;
}

export {
  ShopError,
  Person,
  Product,
  Aliments,
  Furniture,
  Cashier,
  Customer,
  addProductTest,
  fundsTest,
  emptyCartTest,
  paymentTest
};