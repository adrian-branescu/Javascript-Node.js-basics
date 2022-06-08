import { Person } from "./Person.js";
import { MyError } from "./MyError.js";
export class Customer extends Person {
    
    #money;
    #shoppingCart;

    constructor({ birthDate, name, money}) {
        super({ birthDate, name});
        this.#money = money;
        this.#shoppingCart = [];
    }
    
    // add product to cart
    addToCart(product) {
        const today = new Date();
        if (product.expirationDate < today) {
            throw new MyError({
                code: MyError.ERROR_CODE.EXPIRED_PRODUCT,
                data: {
                    expirationDate: product.expirationDate,
                    today: today,
                }
            });
        }
        this.#shoppingCart.push(product);
    }

    // remove an element from cart
    removeFromCart(product) {
        const index = this.#shoppingCart.indexOf(product);
        if (index > -1) {
            this.#shoppingCart.splice(index, 1);
        }
    }

    payTheAmountOfMoney(sum) {
        if (sum > this.#money) {
            throw new MyError({
                code: MyError.ERROR_CODE.NOT_ENOUGH_MONEY,
                data: {
                    money: this.#money,
                    sum: sum,
                }
            });
        }
        this.#money -= sum; 
    }

    get shoppingCart() {
        return this.#shoppingCart;
    }

    toString() {
        return JSON.stringify({
            name: super.name,
            money: this.#money,
            shoppingCart: this.#shoppingCart
        });
    }
}