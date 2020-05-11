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
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log(res);
    })
}


