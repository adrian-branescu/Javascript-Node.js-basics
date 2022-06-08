import { MyError } from "./MyError.js";

export class Products {

    #name;
    #price;

    constructor({name = 'unknown', price = 'unknown'}) {

        if (new.target === Products) {

            throw new MyError({ 
                code: MyError.ERROR_CODE.ABSTRACT_INSTANCE_NOT_ALLOWED,
                data: { class: Products.name }
            });
        }

        this.#name = name;
        this.#price = price;
    }

    get price() {
        return this.#price;
    }

    get name() {
        return this.#name;
    }
}