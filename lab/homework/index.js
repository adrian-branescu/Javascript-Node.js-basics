export class HomeworkError extends Error {
    
    static ERROR_CODE = {
        NOT_A_PRODUCT: 'NOT A PRODUCT',
        NOT_IN_CART: 'NOT IN CART',
        EXPIRED: 'EXPIRED',
        POOR_ALERT: 'NO MONEY'
    };

    static ERROR_MESSAGE = {
        [HomeworkError.ERROR_CODE.NOT_A_PRODUCT]: 'The method must receive an instance of product!',
        [HomeworkError.ERROR_CODE.NOT_IN_CART]: 'The product must exist in the cart!',
        [HomeworkError.ERROR_CODE.EXPIRED]: 'The aliment is expired!',
        [HomeworkError.ERROR_CODE.POOR_ALERT]: 'The customer does not have enough money!',
    };
    
    constructor({ code, message = HomeworkError.ERROR_MESSAGE[code] }) {
        super(message);
        this.code = code;
    }
    
    toString() {
        return this.message + '\n' + this.stack;
    }
    
}



export class Product {
    
    constructor({name, price}) {
        this.name = name;
        this.price = price;
    }
    
}



export class Aliment extends Product {

    constructor({name, price, expirationDate, grammage}) {
        super({name, price});
        this.expirationDate = expirationDate;
        this.grammage = grammage;
    }
    
    isExpired() {
        // compare expiration date with current date
        return this.expirationDate < new Date();
    }

}



export class Furniture extends Product {

    constructor({name, price, colour}) {
        super({name, price});
        this.colour = colour;
    }

}



export class Person {
    
}



export class Customer extends Person {
    
    constructor({money, shoppingCart}) {
        super({});
        this.money = money;
        this.shoppingCart = shoppingCart;
    }
    
    addToCart(product) {
        if (product instanceof Product) {
            if(product instanceof Aliment && product.isExpired()) {
                throw new HomeworkError({
                    code: HomeworkError.ERROR_CODE.EXPIRED
                });
            }
            // add the product to the cart
            this.shoppingCart.push(product);
        } else {
            throw new HomeworkError({
                code: HomeworkError.ERROR_CODE.NOT_A_PRODUCT
            });
        }
    }
    
    removeFromCart(product) {
        if (product instanceof Product) {
            // find element in shopping cart
            var idx = this.shoppingCart.findIndex((el) => el.toString() === product.toString())
            // remove it if it exists
            if(idx > -1) {
                this.shoppingCart.splice(idx, 1);
            } else {
                throw new HomeworkError({
                    code: HomeworkError.ERROR_CODE.NOT_IN_CART
                });
            }
        } else {
            throw new HomeworkError({
                code: HomeworkError.ERROR_CODE.NOT_A_PRODUCT
            });
        }
    }
    
}



export class Cashier extends Person {
    
    constructor({totalSales}) {
        super({});
        this.totalSales = totalSales;
    }
    
    scanAndCash(customer) {
        let total = 0;
        // compute total amount to pay
        for (let prod of customer.shoppingCart) {
            total = total + prod.price;
        }
        // check if the customer affords the cart
        if(customer.money >= total) {
            customer.money = customer.money - total;
            this.totalSales = this.totalSales + total;
            console.log("purchase done");
            customer.shoppingCart.splice(0,customer.shoppingCart.length);
        } else {
            throw new HomeworkError({
                code: HomeworkError.ERROR_CODE.POOR_ALERT
            });
        }
    }
    
}
