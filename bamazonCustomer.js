var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err, res) {
    if (err) throw err;
    // console.log(res);
    start();
});

// main function to run node application using inquirer
function start() {
    // query function that displays all items and their details
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('----------Bamazon welcomes you!----------');
        console.log('-----------------------------------------');

        for (let i = 0; i < res.length; i++) {
            console.log('ID: ' + res[i].item_id + '\n' + 'Product: ' + res[i].product_name + '\n' + 'Department: ' + res[i].department_name + '|')
            console.log('-----------------------------------------');
        }

        // inquirer prompt
        inquirer.prompt([{
            type: "input",
            name: 'id',
            message: 'Input the ID number for the product you would like to purchase',
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }

        }]).then(function (ans) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [ans.id], function (err, res) {
                if (err) throw err;
                // var whatToBuy = (ans.id) - 1;
                var howMuchToBuy = parseInt(ans.quantity);
                var grandTotal = parseFloat(((res[0].price) * howMuchToBuy).toFixed(2));
                // console.log(res);
                // console.log(ans);
                //check if quantity is sufficient
                if (res[0].stock_quantity >= howMuchToBuy) {
                    //after purchase, updates quantity in Products

                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: (res[0].stock_quantity - howMuchToBuy) },
                        { item_id: ans.id }
                    ],
                    );
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                } else {
                    console.log("Sorry, we're all out of those!");
                }

                reprompt();
            })

        })
    })
}

//asks if they would like to purchase another item
function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (ans) {
        if (ans.reply) {
            start();
        } else {
            console.log("See you soon!");
            process.exit();
        }
    });
}