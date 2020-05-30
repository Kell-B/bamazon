# bamazon app
This is a node app that uses the Command Line/terminal to navigate a database with products for an online store(bamazon).

There will be no working link because there is no actual HTML or interactive DOM.

In order to run this app you will need to use the schema.sql provided. You will then need to insert items/values into the database using the INSERT INTO method in the schema.  

## Objectives

 - Use MySQL (mySQL pro, and MAMP) to create a database to store info about the products for sale.
 - Use Node to allow a user to place an order.
 - Use Node to update the SQl database when an item is purchased.
 
 
## How It Works
 The app will begin by displaying all the products available. The user must then enter an id for the item they want and the quantity. The app then determines if there is enough in stock to fill the order. If not, the app will alert the user. Else, it will place the order, and update the sql database to reflect this. Lastly, the app will displays the customer's total price.

## Demonstration Video

Link to gif demo: 

## Technologies

 - Node.js
 - MySQL
 - inquirer npm package
 - JavaScript