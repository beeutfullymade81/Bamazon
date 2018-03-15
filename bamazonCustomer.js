var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon"
});



introduction();


function introduction() {

    console.log("Welcome to Bamazon.");

    inquirer.prompt([{

        type: "confirm",
        name: "viewinventory",
        message: "Would you like to view our inventory?",
        default: true

    }]).then(function (user) {
        if (user.confirm === true) {
            displayInventory();
        }
        else {
            console.log("Thank you for visiting Bamazon.");
        }
    });
}
function tableSetup(res) {
	var table = new Table({
		head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity']
		, colWidths: [10, 45, 40, 8, 8]
	});
	for (var i = 0; i < res.length; i++) {
		table.push([res[i].itemID, res[i].product_name, res[i].department_name, res[i].item_cost, res[i].stock_quantity]);
	}
	console.log(table.toString());
}

var displayInventory = function () {



    var query = "Select * FROM products";
    connection.query(query, function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Price: " + res[i].price);
        };
    )};
};
