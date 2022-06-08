import {expect} from 'chai';
import { Aliments } from "./Aliments.js";
import { Cashier } from "./Cashier.js";
import { Customer } from "./Customer.js";
import { Furniture } from "./Furniture.js";

describe('totalSalesUpdate', () => {

    it('should update the  when trying to buy more things than he can afford', () => {
        const firstAliment = new Aliments({name: 'apple', price: 50, expirationDate: new Date('01-01-2035'), grammage:  100 });
        const firstFurniture = new Furniture({name: 'table', price: 500, colour: 'red' })
        const secondAliment = new Aliments({name: 'pears', price: 100, expirationDate: new Date('01-01-2035'), grammage:  100 });
        const secondFurniture = new Furniture({name: 'chair', price: 50, colour: 'green' });

        const customer = new Customer({ birthDate: new Date('01-01-1995'), name: 'Alina', money: 1000 });

        customer.addToCart(firstAliment);
        customer.addToCart(secondAliment);
        customer.addToCart(firstFurniture);
        customer.addToCart(secondFurniture);

        const cashier = new Cashier({ birthDate: new Date('01-01-1995'), name: 'Florin', totalSales: 0});

        const finalTotalSales = firstAliment.price + firstFurniture.price + secondAliment.price + secondFurniture.price;

        cashier.scanAndCash(customer);

        expect(cashier.totalSales).to.be.eq(finalTotalSales);
    });



})

describe('removeFromCart', () => {

        it('should empty the shoppingCart at calling the removeFromCart method', () => {
            const firstAliment = new Aliments({name: 'apple', price: 50, expirationDate: new Date('01-01-2035'), grammage:  100 });
            const firstFurniture = new Furniture({name: 'table', price: 500, colour: 'red' })
            const secondAliment = new Aliments({name: 'pears', price: 100, expirationDate: new Date('01-01-2035'), grammage:  100 });
            const secondFurniture = new Furniture({name: 'chair', price: 50, colour: 'green' });
    
            const customer = new Customer({ birthDate: new Date('01-01-1995'), name: 'Alina', money: 600 });
    
            customer.addToCart(firstAliment);
            customer.addToCart(secondAliment);
            customer.addToCart(firstFurniture);
            customer.addToCart(secondFurniture);

            customer.removeFromCart(firstAliment);
            customer.removeFromCart(secondAliment);
            customer.removeFromCart(firstFurniture);
            customer.removeFromCart(secondFurniture);

            expect(customer.shoppingCart).to.eql([]);
        });
})

describe('addToCart', () => {
    it('should throw when trying to buy an expired aliment', () => {
        const firstAliment = new Aliments({name: 'apple', price: 50, expirationDate: new Date('01-01-2005'), grammage:  100 });
        const customer = new Customer({ birthDate: new Date('01-01-1995'), name: 'Alina', money: 700 });
        expect(() => customer.addToCart(firstAliment)).to.throw(Error, 'This product is expired');
    });
})

describe('scanAndCash', () => {

    it('should throw when trying to buy more things than he can afford', () => {
        const firstAliment = new Aliments({name: 'apple', price: 50, expirationDate: new Date('01-01-2035'), grammage:  100 });
        const firstFurniture = new Furniture({name: 'table', price: 500, colour: 'red' })
        const secondAliment = new Aliments({name: 'pears', price: 100, expirationDate: new Date('01-01-2035'), grammage:  100 });
        const secondFurniture = new Furniture({name: 'chair', price: 50, colour: 'green' });

        const customer = new Customer({ birthDate: new Date('01-01-1995'), name: 'Alina', money: 600 });

        customer.addToCart(firstAliment);
        customer.addToCart(secondAliment);
        customer.addToCart(firstFurniture);
        customer.addToCart(secondFurniture);

        const cashier = new Cashier({ birthDate: new Date('01-01-1995'), name: 'Florin', totalSales: 0});
        expect(() => cashier.scanAndCash(customer)).to.throw(Error, 'Don t trick the cashier');
    });
})