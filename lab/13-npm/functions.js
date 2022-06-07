function addExpired(aliment) {
    var today = new Date();
    if (aliment.expirationDate < today)
        return -1;
    return 0;
}

function noMoney(sum, customer){
    if (sum > customer.money)
        return -1;
        //throw new Error('Insufficient funds!');
    return 0;
}

function isEmpty(cart){
    if (cart.length == 0)
        return 0;
}

export {
    addExpired,
    noMoney,
    isEmpty
}