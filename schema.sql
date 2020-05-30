CREATE DATABASE bamazon

CREATE TABLE products (
		item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		product_name VARCHAR(30),
		department_name VARCHAR(30),
		price INTEGER(10),
		stock_quantity INTEGER(10)
	);
	
	INSERT INTO products (product_name, department_name, price, stock_quantity)
		VALUES('bed', 'furniture', 250, 1)