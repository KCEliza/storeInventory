DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name,
price, stock_quantity) VALUES('hat', 'clothing', 10.00, 100),
('pan', 'kitchen', 40, 73), ('dress', 'clothing', 47, 84),
('comforter', 'bedroom', 80, 25), ('sun glasses', 'accesories', 5, 38),
('cat food', 'pet', 20, 31), ('chicken statue', 'decor', 30, 3),
('surf board', 'sporting goods', 140, 54), ('lantern', 'sporting goods', 12, 55),
('1000 crickets', 'pet', 29, 7);