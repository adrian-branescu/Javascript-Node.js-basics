export class MyError extends Error {

    static ERROR_CODE = {
        ABSTRACT_INSTANCE_NOT_ALLOWED: 'ABSTRACT_INSTANCE_NOT_ALLOWED',
        NOT_ENOUGH_MONEY: 'NOT_ENOUGH_MONEY',
        EXPIRED_PRODUCT: 'EXPIRED_PRODUCT'
    };

    static ERROR_MESSAGE = {
        [MyError.ERROR_CODE.ABSTRACT_INSTANCE_NOT_ALLOWED]: 'You must extend this class',
        [MyError.ERROR_CODE.NOT_ENOUGH_MONEY]: 'Don t trick the cashier',
        [MyError.ERROR_CODE.EXPIRED_PRODUCT]: 'This product is expired'
    };

    constructor({ code, message = MyError.ERROR_MESSAGE[code], data }) {
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