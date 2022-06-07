'use strict';

class Person {
    constructor(cnp){
        this.cnp = cnp;
    }
};

class Customer extends Person {
    constructor (cnp, money){
        super(cnp);
        this.money = money;
        this.shoppingCart = [];
    }

    addToCart(product, quantity, available_products){
        var available = false;
        var today = new Date();
        //available_products is an array in which the product is looked for
        //(a really small database).
        //This way of implementing gives a more natural approach when calling
        //the addToCart method.
        for (let i = 0; i < available_products.length; i++){
                //if the wanted product is found in the array
                if (product === available_products[i].name){
                    available = true;
                    //checking the expiration date
                    if (available_products[i].expirationDate < today)
                        throw 'Product is expired!';
                    
                    //if the product is not expired, a pair (object, number)
                    //that stands for (product, quantity) is pushed into the cart
                    var pair = [];
                    pair.push(available_products[i])
                    pair.push(quantity);
                    this.shoppingCart.push(pair);
                    //the for loop is ended - there's no need to keep searching if the product
                    //has been found
                    break;
                }
        }

        //if the product is never found in the so-called database an error is thrown
        if (!available)
            throw 'Product out of stock!';
        }

    removeFromCart(product){
        var inCart = false;
        //parsing the array from the end to the beginning - doing this due to the behavior
        //of the splice() function. splice() completely removes elements from the array, so
        //the current index changes. One way of making sure nothing goes wrong (index overflow etc)
        //is starting at the end
        //splice() is used instead of delete() because the latter only deletes the element of the array
        //but does not reindex it, nor does it update its length. the deleted elements appear as undefined,
        //whereas splice() completele removes the element.
        for (let i = this.shoppingCart.length - 1; i >= 0; i--){
                if (product === this.shoppingCart[i][0].name){
                    inCart = true;
                    this.shoppingCart.splice(i, 1);
                }
        }
        if (!inCart)
            throw 'Product not in cart!';
    }

}


class Cashier extends Person {
    constructor(cnp, totalSales){
        super(cnp);
        this.totalSales = totalSales;
    }

    scanAndCash(customer, category){
        //the method takes two arguments - a customer and a so-called database
        //where one cand find the products that are about to be bought.
        var sum = 0;
        //searching for a (product, quantity) pair in the shopping cart until
        //a product name matches a product name in the so-called database
        //entry[1] means quantity and its value is multiplied by the product price
        for (const entry of customer.shoppingCart){
            for (const product of category){
                if (entry[0].name === product.name){
                    sum += entry[1] * product.price;
                }
            }
        }
        //obviously if the customer has less money they can not make the transaction
        if (sum > customer.money)
            throw new Error('Insufficient funds!');
        
        //the sum is substracted from the wallet, the shopping cart is emptied
        //and the totalSales is updated to keep track of the income 
        //and avoid money laundering
        customer.money -= sum;
        customer.shoppingCart.splice(0);
        this.totalSales += sum;
        //what may appear as a logic flaw is the fact that the cart is emptied after looking
        //in a single category/database, but it just seems natural to make two separate purchases,
        //using two separate carts, if you want to buy a gallon of milk and a sofa - you often don't 
        //even find these two objects in the same store.
    }
}

class Product {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class Aliment extends Product {
    constructor(name, price, expirationDate, grammage){
        super(name, price);
        this.expirationDate = expirationDate;
        this.grammage = grammage;
    }
}

class Furniture extends Product{
    constructor(name, price, color){
        super(name, price);
        this.color = color;
    }
}
/*
var valentin = new Customer(1990315, 60);
console.log(valentin);
console.log(valentin.shoppingCart);


valentin.addToCart('orez', 10);
valentin.addToCart('orez');
console.log(valentin.shoppingCart);

valentin.removeFromCart('paine');
console.log(valentin.shoppingCart.orez);
*/

//alimente and mobila - the two so-called databases

var alimente = [new Aliment('orez', 5, new Date('2020-02-21'), 1000), 
                new Aliment('paine', 2, new Date('2022-11-14'), 500), 
                new Aliment('lapte', 6, new Date('2022-08-26'), 1500),
                new Aliment('cafea', 20, new Date('2025-09-09'), 500)];


var mobila = [new Furniture('scaun', 400, 'negru'),
              new Furniture('saltea', 700, 'alba')];



export {
    Customer,
    Cashier,
    Aliment
}

/*try{
    valentin.addToCart('lapte', 10, alimente);
    valentin.addToCart('paine', 3, alimente);
    valentin.addToCart('cafea', 5, alimente);
    //valentin.addToCart('orez', 2, alimente);
}
catch (e){
    console.error(e);
}

try {
    valentin.removeFromCart('lapte');
}
catch (e){
    console.error(e);
}

try {
    valentin.removeFromCart('branza');
}
catch(e){
    console.error(e);
}

//console.log(valentin.shoppingCart);

//console.log(valentin.shoppingCart.length);

//var Alinuta = new Cashier('1990314', 0);
//Alinuta.scanAndCash(valentin, alimente);
//console.log(valentin);
*/
