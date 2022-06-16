export class ShoppingError extends Error {

    static ERROR_CODE = {
        EXPIRED_ALIMENT: 'EXPIRED_ALIMENT',
        NOT_ENOUGH_MONEY: 'NOT_ENOUGH_MONEY',
        NON_EXISTENT_PRODUCT: 'NON_EXISTENT_PRODUCT'
    };

    static ERROR_MESSAGE = {
        [ShoppingError.ERROR_CODE.EXPIRED_ALIMENT]: 'Given aliment is expired',
        [ShoppingError.ERROR_CODE.NOT_ENOUGH_MONEY]: 'Not enough money to pay the products in cart',
        [ShoppingError.ERROR_CODE.NON_EXISTENT_PRODUCT]: 'Given product is not in the cart'
    };

    constructor({ code, message = ShoppingError.ERROR_MESSAGE[code], data }) {
        super(message);

        this.code = code;
        this.data = data;
    }

    toString() {
        return JSON.stringify({
            code: this.code,
            message: this.message,
            data: this.data
        });
    }

}