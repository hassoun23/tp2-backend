const ManagerProduct = require('./manager.js');
const manager = new ManagerProduct();

let producto = {
	title: 'escuadra',
	price: 150,
	thumbnail:
		'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
};

manager.createProduct(producto).then((result) => console.log(result));
