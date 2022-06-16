import {Person} from "./person.js";
import {ShoppingError} from "./shoppingError.js";
export class Cashier extends Person {

    #totalSales;

    constructor() {
        super();
        this.#totalSales = 0;
    }

    get totalSales() {
        return this.#totalSales;
    }

    scanAndCash(customer) {
        let totalCartPrice = 0;
        customer.shoppingCart.forEach(product => {totalCartPrice += product.price});

        if (totalCartPrice > customer.money) {
            throw new ShoppingError({
                code: ShoppingError.ERROR_CODE.NOT_ENOUGH_MONEY,
                data: { customer }
            });
        }

        customer.money -= totalCartPrice;
        customer.shoppingCart = [];
        this.#totalSales += totalCartPrice;
    }

}