var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].id + ' Product Name: ' + res[i].product_name + ' Price: $' + res[i].price + 'Amount Available: ' + res[i].stock_quantity)
        }
        placeOrder();
    })
}
function placeOrder(){
    inquirer.prompt([{
        name: "selectId",
        message: "Please enter the ID of the item you wish to purchase",
        validate: function(value){
            var valid = value.match(/^[0-9]+$/)
            if(valid){
                return true;
            }
            return "Please enter a valid Product ID"
        }
    }, {
        name: "selectQuantity",
        message: "How many would you like?",
        validate: function(value){
			var valid = value.match(/^[0-9]+$/)
			if(valid){
				return true
			}
				return "Please enter a valid numerical value"
		}
    }]).then(function(answer){
        connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function(err, res){
            if(answer.selectQuantity > res[0].StockQuantity){
                console.log('Insufficient Quantity');
                console.log('This order has been cancelled');
                console.log('');
                newOrder();
            }
            else{
                amountOwed = res[0].Price * answer.selectQuantity;
                currentDepartment = res[0].DepartmentName;
                console.log('Thanks for your order');
                console.log('You owe $' + amountOwed);
                console.log('');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    StockQuantity: res[0].StockQuantity - answer.selectQuantity
                },{
                    id: answer.selectId
                }], function(err, res){});
                //update departments table
                logSaleToDepartment();
                newOrder();
            }
        })
    
    }, function(err, res){})
}