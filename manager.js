const fs = require('fs');
const pathToFile = './productos.json';

class ManagerProduct {
	createProduct = async (producto) => {
		if (!producto.title || !producto.price || !producto.thumbnail)
			return {
				status: 'error',
				message: 'no se han ingresado todos los campos',
			};
		try {
			if (fs.existsSync(pathToFile)) {
				let data = await fs.promises.readFile(pathToFile, 'utf-8');
				let productos = JSON.parse(data);
				let id = productos[productos.length - 1].id + 1;
				producto.id = id;
				productos.push(producto);
				await fs.promises.writeFile(
					pathToFile,
					JSON.stringify(productos, null, 2)
				);
				return {
					status: 'success',
					message: `Product ${producto.title} added successfully`,
				};
			} else {
				producto.id = 1;
				await fs.promises.writeFile(
					pathToFile,
					JSON.stringify([producto], null, 2)
				);
				return {
					status: 'success',
					message: `Product ${producto.title} added successfully`,
				};
			}
		} catch (err) {
			return { status: 'error', message: err.message };
		}
	};

	getById = async (id) => {
		if (!id) return { status: 'error', message: 'favor ingresar ID' };
		if (fs.existsSync(pathToFile)) {
			let data = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(data);
			let producto = productos.find((producto) => producto.id === id);
			if (producto) return { status: 'success', message: producto };
			return { status: 'error', message: 'null' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	getAll = async () => {
		try {
			if (fs.existsSync(pathToFile)) {
				let data = await fs.promises.readFile(pathToFile, 'utf-8');
				let productos = JSON.parse(data);
				return { status: 'success', message: productos };
			} else {
				return { status: 'error', message: err.message };
			}
		} catch (err) {
			return { status: 'error', producto: error.message };
		}
	};
	deleteById = async (id) => {
		if (!id) return { status: 'error', message: 'favor ingresar ID' };
		if (fs.existsSync(pathToFile)) {
			let data = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(data);
			let newProductos = productos.filter((producto) => producto.id !== id);
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newProductos, null, 2)
			);
			return { status: 'success', message: 'Product deleted successfully' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	deleteAll = async () => {
		if (fs.existsSync(pathToFile)) {
			let data = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(data);
			let newProductos = productos.filter((producto) => producto.length);
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newProductos, null, 2)
			);
			return { status: 'success', message: 'Products deleted successfully' };
		} else {
			return { status: 'error', message: err.message };
		}
	};
	updateProduct = async (id, updatedUser) => {
		//Validation
		if (!id) return { status: 'error', message: 'Id required' };
		if (fs.existsSync(pathToFile)) {
			let data = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(data);
			let newProductos = productos.map((user) => {
				if (user.id === id) {
					updatedUser.id = id;
					return updatedUser;
				} else return user;
			});
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newProductos, null, 2)
			);
			return { status: 'success', message: 'User updated!' };
		} else {
			return { status: 'error', message: err.message };
		}
	};
}

module.exports = ManagerProduct;
