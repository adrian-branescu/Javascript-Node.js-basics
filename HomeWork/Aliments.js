import { Products } from "./Products.js";
export class Aliments extends Products {
    
    #expirationDate;
    #grammage; 

    constructor({ name, price, expirationDate,  grammage}) {
        super({ name, price});
        this.#expirationDate = expirationDate;
        this.#grammage = grammage;
    }

    get expirationDate() {
        return this.#expirationDate;
    }

    print() {
        console.log(super.name);
        console.log(super.price);
        console.log(this.#expirationDate);
        console.log(this.#grammage);
    }
}