'use strict'

class erori extends Error {
  static ERROR_CODE = {
       METHOD_NOT_IMPLEMENTED: 'METHOD_NOT_IMPLEMENTED',
       EXPIRED_PRODUCT: 'EXPIRED_PRODUCT',
       NOT_ENOUGH_MONEY: 'NOT_ENOUGH_MONEY'
   };

   static ERROR_MESSAGE = {
       [erori.ERROR_CODE.METHOD_NOT_IMPLEMENTED]: 'You must implement this method',
       [erori.ERROR_CODE.EXPIRED_PRODUCT]: 'This product is expired',
       [erori.ERROR_CODE.NOT_ENOUGH_MONEY]: "This customer doesn't have enough money"
   };

   constructor({ code, message = erori.ERROR_MESSAGE[code], data }) {
       super(message);

       this.code = code;
       this.data = data;
   }
}


class Person {
  constructor() {}
}

class Customer extends Person {
  #money
  #shopping_cart

  constructor (money, shopping_cart) {
    super();
    this.#money = money
    this.#shopping_cart = shopping_cart
  }

  addToCart(product) {
    try {
      const data = product.getDate()
      if(data - new Date() < 0)
          throw new erori({
                  code: erori.ERROR_CODE.EXPIRED_PRODUCT,
                  data: { class: Customer.name }
              });
      this.#shopping_cart.push(product)
    }
    catch (error) {
      if(error.code != 'EXPIRED_PRODUCT') {
          this.#shopping_cart.push(product)
      }
      else {
        throw new erori({
                code: erori.ERROR_CODE.EXPIRED_PRODUCT,
                data: { class: Customer.name }
            });
      }
    }
  }

  removeFromCart(product) {
    this.#shopping_cart.filter(crt => crt != product)
  }

  getShoppingCart() {return this.#shopping_cart;}
  getMoney() {return this.#money;}
  updateMoney(val) {this.#money += val;}
  updateCart(cart) {this.#shopping_cart = cart;}
}

class Cashier extends Person {
  #totalSales ///am presupus ca e vorba de total sales pentru un anumit angajat, daca e pentru tot magazinul trebuia sa fie de tip static
  constructor () {
    super();
    this.#totalSales = 0;
  }

  scanAndCash(customer) {
    let topay = 0
    const cos = customer.getShoppingCart()
    for(const prod of cos) {
      topay += prod.getPrice()
    }

      if(customer.getMoney() < topay)
        throw new erori ({
          code: erori.ERROR_CODE.NOT_ENOUGH_MONEY,
          data: { class: Cashier.name }
        })
    this.#totalSales += topay
    customer.updateMoney(-topay)
    customer.updateCart([])
    return [customer.getShoppingCart().length, this.#totalSales]
  }
}

class Products {
  #name
  #price

  constructor(name, price) {
    this.#name = name
    this.#price = price
  }

  getPrice() {return this.#price;}
}

class Aliments extends Products {
  #expirationDate
  #grammage

  constructor(name, price, expirationDate, grammage) {
    super(name, price)
    this.#expirationDate = expirationDate
    this.#grammage = grammage
  }
  getDate() {return this.#expirationDate;}
}

class Furniture extends Products {
  #colour

  constructor(name, price, colour) {
    super(name, price)
    this.#colour = colour
  }
}

function AddCos(produs) {
  const client = new Customer(1000, [])
  client.addToCart(produs);
  return client.getShoppingCart().length;
}

function VerificaCos(client) {
  const casier = new Cashier();
  casier.scanAndCash(client)
  return true;
}

function GolesteCos() {
  const client = new Customer(1000, [])
  const branza = new Aliments("branza", 6, new Date(), 150);
  client.addToCart(branza);
  client.addToCart(branza);
  client.addToCart(branza);
  const casier = new Cashier();
  return casier.scanAndCash(client);
}

export {
  erori,
  Products,
  Aliments,
  Furniture,
  Person,
  Cashier,
  Customer,
  AddCos,
  VerificaCos,
  GolesteCos
}
