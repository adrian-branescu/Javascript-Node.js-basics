import { Person } from "./Person.js";

export class Cashier extends Person {
    
    #totalSales;

    constructor({ birthDate, name, totalSales }) {
        super({ birthDate, name});
        this.#totalSales = totalSales;
    }
    
    // scan the products, calcultate the initial sum, make the customer to pay
    scanAndCash(customer) {
        let intialSum = 0;
        customer.shoppingCart.forEach(product => {
            intialSum += product.price;
        });
        customer.payTheAmountOfMoney(intialSum);
        this.#totalSales += intialSum;
    }

    get totalSales() {
        return this.#totalSales;
    }

    toString() {
        return JSON.stringify({
            name: super.name,
            totalSales: this.#totalSales
        });
    }
}