# Homework: JavaScript Basics

## Introduction
You will have to implement different classes related to a shopping market and test them. <br>
The class hierarchy is the following one:
 - Person
   - Customer
     * money (Property)
     * shoppingCart (Property)
     * addToCart(product) (Method - should add item to the shoppingCart)
     * removeFromCart(product) (Method - should remove item from the shoppingCart)
   - Cashier
     * totalSales (Property)
     * scanAndCash(customer) (Method - should access the shopping cart of the customer and make him pay the initial sum)
 - Products
     * name (Property)
     * price (Property)
   - Aliments
     * expirationDate (Property)
     * grammage (Property)
   - Furniture
     * colour (Property)

### Task 1
The classes mentioned above with their respective methods and properties should all be implemented. <br>
Additionally, you can implement any other auxiliary method that you would find helpful. <br>
### Task 2
For the second task, you have to extend the implementation from task 1 to incorporate the following error situations:
 - a customer won't add to his shopping cart an aliment that is expired.
 - a customer can try to trick a cashier to buy more things than he can afford, but the cashier should detect this situation.
In this situations you should through an error.
### Task 3
You should use mocha and chai to test your implementation. <br>
You should test the errors mentioned above, and also the following situations:
 - the cashier should empty the shoppingCart of the customer.
 - the cashier should update the totalSales property with the total sum paid by each customer (so she doesn't steal money).
You are encouraged to test any other situation that you find relevant.