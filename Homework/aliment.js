import {Product} from "./product.js"
export class Aliment extends Product {

    #expirationDate
    #grammage

    constructor({name, price, expirationDate,  grammage}) {
        super({name, price});
        this.#expirationDate = expirationDate;
        this.#grammage = grammage;
    }

    get expirationDate() {
        return this.#expirationDate;
    }

    get grammage() {
        return this.#grammage;
    }
}