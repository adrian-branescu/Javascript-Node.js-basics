import { Products } from "./Products.js";

export class Furniture extends Products {

    #colour; 

    constructor({ name, price, colour}) {
        super({ name, price});
        this.#colour = colour;
    }

    print() {
        console.log(super.name);
        console.log(super.price);
        console.log(this.#colour);
    }
}