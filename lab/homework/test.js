import {expect} from 'chai';
import {HomeworkError, Product, Aliment, Furniture, Person, Customer, Cashier} from './index.js';





describe('Customer ERRORS', () => {

    it('a customer won\'t add to his shopping cart an aliment that is expired', () => {
        let customer1 = new Customer({money: 100, shoppingCart: new Array()});
        let prod0 = new Furniture({name: "sofa", price: 70, colour: "blue"});
        let prod1 = new Aliment({name: "pudding", price: 10, expirationDate: new Date() + 1, grammage: 50});
        let prod2 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() + 1, grammage: 150});
        let prod3 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() - 7, grammage: 150});
        let cashier1 = new Cashier({totalSales: 0});
        
        expect(() => customer1.addToCart(prod3))
            .to.throw(HomeworkError, HomeworkError.ERROR_MESSAGE[HomeworkError.ERROR_CODE.EXPIRED], '');
     
    });

    
    it('a customer can try to trick a cashier to buy more things than he can afford,\
        but the cashier should detect this situation', () => {
        let customer1 = new Customer({money: 100, shoppingCart: new Array()});
        let prod0 = new Furniture({name: "sofa", price: 70, colour: "blue"});
        let prod1 = new Aliment({name: "pudding", price: 10, expirationDate: new Date() + 1, grammage: 50});
        let prod2 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() + 1, grammage: 150});
        let prod3 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() - 7, grammage: 150});
        let cashier1 = new Cashier({totalSales: 0});
        
        customer1.addToCart(prod0);
        customer1.addToCart(prod1);
        customer1.addToCart(prod2);
        
        expect(() => cashier1.scanAndCash(customer1))
            .to.throw(HomeworkError, HomeworkError.ERROR_MESSAGE[HomeworkError.ERROR_CODE.POOR_ALERT], '');
     
    });
    
})






describe('Cashier', () => {
    
    it('the cashier should empty the shoppingCart of the customer', () => {
        let customer1 = new Customer({money: 100, shoppingCart: new Array()});
        let prod0 = new Furniture({name: "sofa", price: 70, colour: "blue"});
        let prod1 = new Aliment({name: "pudding", price: 10, expirationDate: new Date() + 1, grammage: 50});
        let prod2 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() + 1, grammage: 150});
        let prod3 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() - 7, grammage: 150});
        let cashier1 = new Cashier({totalSales: 0});
        
        // add products correctly (total < custmoer's money)
        customer1.addToCart(prod0);
        customer1.addToCart(prod1);
        cashier1.scanAndCash(customer1);
        
        let isEmpty = (customer1.shoppingCart.length === 0);
        
        expect(isEmpty).to.be.true;
    
    });
    
    
    it('the cashier should update the totalSales property with the total sum paid by each customer', () => {
        let customer1 = new Customer({money: 100, shoppingCart: new Array()});
        let prod0 = new Furniture({name: "sofa", price: 70, colour: "blue"});
        let prod1 = new Aliment({name: "pudding", price: 10, expirationDate: new Date() + 1, grammage: 50});
        let prod2 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() + 1, grammage: 150});
        let prod3 = new Aliment({name: "puddingx3", price: 30, expirationDate: new Date() - 7, grammage: 150});
        let cashier1 = new Cashier({totalSales: 0});
        
        // add products correctly (total < custmoer's money)
        let initSales = cashier1.totalSales;
        customer1.addToCart(prod0);
        customer1.addToCart(prod1);
        
        // compute how much the customer has to pay
        let total = 0;
        for (let prod of customer1.shoppingCart) {
            total = total + prod.price;
        }
        
        cashier1.scanAndCash(customer1);
        let crtSales = cashier1.totalSales;
        
        expect(crtSales - initSales).to.be.eq(total);
    
    });

})
