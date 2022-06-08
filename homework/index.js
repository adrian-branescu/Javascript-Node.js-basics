class ShoppingMarketError extends Error {
    static ERROR_CODE = {
        EXPIRED_ALIMENT: 'EXPIRED_ALIMENT',
        NOT_IN_CART: 'NOT_IN_CART',
        INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS'
    };

    static ERROR_MESSAGE = {
        [ShoppingMarketError.ERROR_CODE.EXPIRED_ALIMENT]:
            'Aliment is expired',

        [ShoppingMarketError.ERROR_CODE.NOT_IN_CART]:
            'Product is not in the shopping cart',

        [ShoppingMarketError.ERROR_CODE.INSUFFICIENT_FUNDS]:
            'Customer has insufficient funds'
    };

    constructor({
        code,
        message = ShoppingMarketError.ERROR_MESSAGE[code],
        data
    }) {
        super(message);

        this.code = code;
        this.data = data;
    }

    toString() {
        return JSON.stringify({
            code: this.code,
            message: this.message,
            data: this.data
        }, null, 4) + '\n' + this.stack;
    }
}

class Person {
    #name;

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }
}

class Customer extends Person {
    #money;
    #shoppingCart;

    constructor({ name = 'unknown', money }) {
        super(name);

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

    addToCart(product) {
        if (product instanceof Product === false) {
            throw new TypeError('product must be a Product');
        }

        if (product instanceof Aliment && product.expirationDate < Date.now()) {
            throw new ShoppingMarketError({
                code: ShoppingMarketError.ERROR_CODE.EXPIRED_ALIMENT,
                data: { product }
            });
        }

        this.#shoppingCart.push(product);
    }

    removeFromCart(product) {
        if (product instanceof Product === false) {
            throw new TypeError('product must be a Product');
        }

        const cartElementIndex = this.#shoppingCart.findIndex(cartElement => {
            return cartElement === product;
        });

        if (cartElementIndex === -1) {
            throw new ShoppingMarketError({
                code: ShoppingMarketError.ERROR_CODE.NOT_IN_CART,
                data: { product }
            });
        }

        this.#shoppingCart.splice(cartElementIndex, 1);
    }
}

class Cashier extends Person {
    #totalSales;

    constructor(name) {
        super(name);

        this.#totalSales = 0;
    }

    get totalSales() {
        return this.#totalSales;
    }

    scanAndCash(customer) {
        if (customer instanceof Customer === false) {
            throw new TypeError('customer must be a Customer');
        }

        let amountDue = 0;
        customer.shoppingCart.forEach(product => amountDue += product.price);

        if (amountDue > customer.money) {
            throw new ShoppingMarketError({
                code: ShoppingMarketError.ERROR_CODE.INSUFFICIENT_FUNDS,
                data: { amountDue, customer }
            });
        }

        customer.money -= amountDue;
        customer.shoppingCart.length = 0;

        this.#totalSales += amountDue;
    }
}

class Product {
    #name;
    #price;

    constructor(name, price) {
        this.#name = name;
        this.#price = price;
    }

    get name() {
        return this.#name;
    }

    get price() {
        return this.#price;
    }

    set price(price) {
        this.#price = price;
    }
}

class Aliment extends Product {
    #expirationDate;
    #grammage;

    constructor(name, price, expirationDate, grammage) {
        if (expirationDate instanceof Date === false) {
            throw new TypeError('expirationDate must be a Date');
        }

        super(name, price);

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

class Furniture extends Product {
    #colour;

    constructor(name, price, colour) {
        super(name, price);

        this.#colour = colour;
    }

    get colour() {
        return this.#colour;
    }
}

export {
    ShoppingMarketError, Person, Customer, Cashier, Product, Aliment, Furniture
};
