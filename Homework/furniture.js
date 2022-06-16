import {Product} from "./product.js"
export class Furniture extends Product {
    
    #colour

    constructor({name, price, colour}) {
        super({name, price});
        this.#colour = colour;
    }

    get colour() {
        return this.#colour;
    }
}