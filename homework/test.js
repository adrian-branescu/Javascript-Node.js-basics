import { expect } from 'chai';
import {
    ShoppingMarketError, Person, Customer, Cashier, Product, Aliment, Furniture
} from './index.js';

describe('Customer tests', () => {
    it('Customer should not add an expired aliment to his shopping cart',
        () => {
            const todayDate = new Date();
            const yesterdayDate = new Date();
            yesterdayDate.setDate(todayDate.getDate() - 1);

            const customer = new Customer({ money: 101 });
            const expiredAliment =
                new Aliment("Yogurt", 5.49, yesterdayDate, 100);

            const expectedErrorCode =
                ShoppingMarketError.ERROR_CODE.EXPIRED_ALIMENT;

            expect(() => customer.addToCart(expiredAliment)).to.throw(
                ShoppingMarketError,
                ShoppingMarketError.ERROR_MESSAGE[expectedErrorCode],
                'Customer added an expired aliment to his shopping cart');
        });

    it('Customer should not trick cashier to buy more than he can afford',
        () => {
            const customer = new Customer({ money: 1500 });
            const cashier = new Cashier('Cashier');

            const roundTable = new Furniture('Round table', 799, 'brown');
            const woodenChair = new Furniture('Wooden chair', 299, 'brown');
            const sofa = new Furniture('Sofa', 1199, 'brown');

            customer.addToCart(roundTable);
            customer.addToCart(woodenChair);
            customer.addToCart(sofa);

            const expectedErrorCode =
                ShoppingMarketError.ERROR_CODE.INSUFFICIENT_FUNDS;

            expect(() => cashier.scanAndCash(customer)).to.throw(
                ShoppingMarketError,
                ShoppingMarketError.ERROR_MESSAGE[expectedErrorCode],
                'Customer tricked cashier to buy more things than he can afford'
            );
        });
});

describe('Cashier tests', () => {
    it('Cashier should empty the shoppingCart of the customer',
        () => {
            const customer = new Customer({ money: 5000 });
            const cashier = new Cashier('Cashier');

            const roundTable = new Furniture('Round table', 799, 'brown');
            const standingDesk = new Furniture('Standing desk', 999, 'black');
            const woodenChair = new Furniture('Wooden chair', 299, 'brown');
            const sofa = new Furniture('Sofa', 1199, 'brown');

            customer.addToCart(roundTable);
            customer.addToCart(standingDesk);
            customer.addToCart(woodenChair);
            customer.addToCart(sofa);

            cashier.scanAndCash(customer);

            expect(customer.shoppingCart.length === 0).to.be.true;
        });

    it('Cashier should update the totalSales property with the total sum paid' +
        ' by each customer',
        () => {
            const customer = new Customer({ money: 5000 });
            const cashier = new Cashier('Cashier');

            const roundTable = new Furniture('Round table', 799, 'brown');
            const standingDesk = new Furniture('Standing desk', 999, 'black');
            const woodenChair = new Furniture('Wooden chair', 299, 'brown');

            customer.addToCart(roundTable);
            customer.addToCart(standingDesk);
            customer.addToCart(woodenChair);

            let amountDue = 0;
            customer.shoppingCart.forEach(product => {
                amountDue += product.price;
            });

            expect(cashier.totalSales === 0).to.be.true;

            cashier.scanAndCash(customer);

            expect(amountDue - cashier.totalSales < 0.01).to.be.true;
        });
});
