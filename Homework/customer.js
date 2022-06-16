import {Person} from "./person.js";
import {ShoppingError} from "./shoppingError.js";
import {Aliment} from "./aliment.js"
export class Customer extends Person {

    #money;
    #shoppingCart;

    constructor({money}) {
        super();
        this.#money = money;
        this.#shoppingCart = [];
    }

    get money() {
        return this.#money;
    }

    get shoppingCart() {
        return this.#shoppingCart;
    }

    set money(money) {
        this.#money = money;
    }

    set shoppingCart(shoppingCart) {
        this.#shoppingCart = shoppingCart;
    }

    addToCart(product) {
        if (product.expirationDate < Date.now() && product instanceof Aliment) {
            throw new ShoppingError({
                code: ShoppingError.ERROR_CODE.EXPIRED_ALIMENT,
                data: { product }
            });
        }
        this.#shoppingCart.push(product);
    }

    removeFromCart(product) {
        let indexOfProduct = this.#shoppingCart.indexOf(product);
        if (indexOfProduct < 0) {
            throw new ShoppingError({
                code: ShoppingError.ERROR_CODE.NON_EXISTENT_PRODUCT,
                data: { product }
            });
        }

        this.#shoppingCart.splice(indexOfProduct, 1);
    }
}