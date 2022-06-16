import {expect} from 'chai';
import {Aliment} from "./aliment.js";
import {Cashier} from "./cashier.js";
import {Customer} from "./customer.js";
import {Furniture} from "./furniture.js";
import {ShoppingError} from "./shoppingError.js"

describe('addToCart', () => {
    it('should add to the cart the given product', () => {
        const product = new Furniture({name: 'couch', price: 50, colour: 'red'});
        const customer = new Customer({money: 500});
        customer.addToCart(product);
        expect(customer.shoppingCart.length).to.be.eq(1);
    });

    it('should throw a ShoppingError when trying to buy an expired aliment', () => {
        const aliment = new Aliment({name: 'caffee', price: 20, expirationDate: new Date('04-03-2012'), grammage:  200 });
        const customer = new Customer({money: 500});
        expect(() => customer.addToCart(aliment)).to.throw(ShoppingError,
            ShoppingError.ERROR_MESSAGE[ShoppingError.EXPIRED_ALIMENT]);
    });
})

describe('removeFromCart', () => {
    it('should remove from the cart the given product', () => {
        const existingProduct = new Aliment({name: 'orange', price: 10, expirationDate: new Date('24-07-2022'), grammage:  100 });
        const customer = new Customer({money: 400});

        customer.addToCart(existingProduct);
        expect(customer.shoppingCart.length).to.be.eq(1);

        customer.removeFromCart(existingProduct);
        expect(customer.shoppingCart.length).to.be.eq(0);
    });

    it('should throw a ShoppingError when trying to remove a non existing product', () => {
        const existingProduct = new Aliment({name: 'orange', price: 10, expirationDate: new Date('24-07-2022'), grammage:  100 });
        const nonexistingProduct = new Aliment({name: 'coffee', price: 20, expirationDate: new Date('04-03-2012'), grammage:  200 });

        const customer = new Customer({money: 400});

        customer.addToCart(existingProduct);
        expect(() => customer.removeFromCart(nonexistingProduct)).to.throw(ShoppingError, 
            ShoppingError.ERROR_MESSAGE[ShoppingError.NON_EXISTENT_PRODUCT]);
    });
})

describe('scanAndCash', () => {
    it('should empty the shopping cart', () => {
        const furniture = new Furniture({name: 'couch', price: 50, colour: 'red'});
        const aliment = new Aliment({name: 'coffee', price: 20, expirationDate: new Date('25-08-2024'), grammage:  200 });

        const customer = new Customer({money: 500});
        const cashier = new Cashier();

        customer.addToCart(furniture);
        customer.addToCart(aliment);

        cashier.scanAndCash(customer);
        expect(customer.shoppingCart.length).to.be.eq(0);
    });

    it('should throw a ShoppingError when the customer is trying to trick the cashier', () => {
        const furniture = new Furniture({name: 'golden bed frame', price: 4500, colour: 'golden'})
        const aliment = new Aliment({name: 'coffee', price: 20, expirationDate: new Date('25-08-2024'), grammage:  200 });

        const customer = new Customer({money: 4500});
        const cashier = new Cashier();

        customer.addToCart(furniture);
        customer.addToCart(aliment);

        expect(() => cashier.scanAndCash(customer)).to.throw(ShoppingError, 
            ShoppingError.ERROR_MESSAGE[ShoppingError.NOT_ENOUGH_MONEY]);
    });

    it('should update totalSales properly', () => {
        const furniture = new Furniture({name: 'couch', price: 50, colour: 'red'});
        const aliment = new Aliment({name: 'coffee', price: 20, expirationDate: new Date('25-08-2024'), grammage:  200 });

        const first_customer = new Customer({money: 4500});
        const second_customer = new Customer({money: 350});
        const cashier = new Cashier();

        first_customer.addToCart(furniture);
        first_customer.addToCart(aliment);

        second_customer.addToCart(furniture);
        second_customer.addToCart(aliment);

        cashier.scanAndCash(first_customer);
        cashier.scanAndCash(second_customer);

        expect(cashier.totalSales).to.be.eq(140);
    });
})
