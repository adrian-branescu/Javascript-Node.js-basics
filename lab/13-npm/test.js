import {expect} from 'chai';
import {addExpired, isEmpty, noMoney} from './functions.js';
import {Customer, Aliment, Cashier} from './classes.js';

describe('Adding expired products to cart', () => {
    var alimente = [new Aliment('lapte', 5, new Date('2020-02-21'), 1000),
                    new Aliment('cafea', 20, new Date('2025-09-09'), 500)];
    it ('should fail - expired product', () => {
        expect(addExpired(alimente[0])).to.be.eq(-1);
    });

    it ('should pass - good product', () => {
        expect(addExpired(alimente[1])).to.be.eq(0);
    });
                    
});

describe('Little money', () => {
    var alimente = [new Aliment('lapte', 5, new Date('2020-02-21'), 1000),
                    new Aliment('cafea', 20, new Date('2025-09-09'), 500)];
    
    var dummy = new Customer(1990921, 100);
    it ('should fail - too expensive', () => {
        var suma = alimente[0].price * 5 + alimente[1].price * 4
        //The customer has 100 RON and tries to buy 5 liters of milk, 5 RON each
        //and 4 packs of coffee - 20 RON each = 25 + 80 = 105 > 100 RON => should fail
        expect(noMoney(suma, dummy)).to.be.eq(-1);
    });

    it ('should pass - cheap enough', () => {
        var suma = alimente[1].price * 2
        expect(noMoney(suma, dummy)).to.be.eq(0);
    });
});

describe('Removing items from cart', () => {
    var alimente = [new Aliment('lapte', 5, new Date('2020-02-21'), 1000),
                    new Aliment('cafea', 20, new Date('2025-09-09'), 500)];
    var cashier = new Cashier(99999999, 0);
    var customer = new Customer(99999999, 20);

    it ('should pass - cart gets emptied', () => {
        customer.addToCart('cafea', 1, alimente);
        cashier.scanAndCash(customer, alimente);
        expect(isEmpty(customer.shoppingCart)).to.be.eq(0);
    });
});


