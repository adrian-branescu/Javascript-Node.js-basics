import { expect } from 'chai';
import {  ShopError, Aliments, Furniture, Customer, addProductTest, fundsTest, emptyCartTest, paymentTest } from './homework.js';

describe('AddAliment', () => {
    it('Valid Aliment', () => {
        var futureDate = new Date(); 
        futureDate.setDate(new Date() + 1);

        var testAliment = new Aliments('testAliment', 20, futureDate, 100);

        expect(addProductTest(testAliment)).to.be.eq(true);
    });

    it('Expired Aliment', () => {
        var pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);

        var testAliment = new Aliments('testAliment', 20, pastDate, 100);
        
        expect(() => addProductTest(testAliment)).to.throw(ShopError, 'Customer can not add an expired aliment to their shopping cart.');
    });
});

describe('Funds', () => {
    it('Enough Funds', () => {
        var testCustomer = new Customer('testCustomer', 100);
        
        expect(fundsTest(testCustomer)).to.be.eq(90);
    });

    it('Not Enough Funds', () => {
        var testCustomer = new Customer('testCustomer', 80);

        expect(() => fundsTest(testCustomer)).to.throw(ShopError, 'Customer does not have enough funds to pay for all their products.');
    })
});

describe('Checkout', () => {
    it('Empty Cart', () => {
        var testCustomer = new Customer('testCustomer', 100);
        var testFurniture = new Furniture('testFurniture', 30, 'testColor');
        testCustomer.addToCart(testFurniture);
        testCustomer.addToCart(testFurniture);

        expect(emptyCartTest(testCustomer)).to.be.eq(0);
    });

    it('Check Total Payment', () => {
        var testCustomer = new Customer('testCustomer', 100);
        var testFurniture = new Furniture('testFurniture', 30, 'testColor');
        testCustomer.addToCart(testFurniture);
        testCustomer.addToCart(testFurniture);
        
        expect(paymentTest(testCustomer)).to.be.eq(60);
    })
});