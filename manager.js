const fs = require('fs');
const pathToFile = './users.json';

class Manager {
	createUser = async (user) => {
		//Validate user
		if (!user.first_name || !user.username || !user.mail)
			return { status: 'error', message: 'missing fields' };
		try {
			if (fs.existsSync(pathToFile)) {
				let data = await fs.promises.readFile(pathToFile, 'utf-8');
				let users = JSON.parse(data);
				let id = users[users.length - 1].id + 1;
				user.id = id;
				users.push(user);
				await fs.promises.writeFile(pathToFile, JSON.stringify(users, null, 2));
				return { status: 'success', message: 'Usuario creado' };
			} else {
				user.id = 1;
				await fs.promises.writeFile(
					pathToFile,
					JSON.stringify([user], null, 2)
				);
				return { status: 'success', message: 'Usuario creado' };
			}
		} catch (err) {
			return { status: 'error', message: err.message };
		}
	};

	findAll = async () => {
		if (fs.existsSync(pathToFile)) {
			let data = await fs.readFile(pathToFile, 'utf-8');
			let users = JSON.parse(data);
			return { status: 'success', message: users };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	findById = async (id) => {
		if (fs.existsSync(pathToFile)) {
			let data = await fs.readFile(pathToFile, 'utf-8');
			let users = JSON.parse(data);
			let user = users.find((user) => user.id === id);
			if (user) return { status: 'success', message: user };
			return { status: 'error', message: 'usuario no encontrado' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	updateUser = async (id, updateUser) => {
		if (fs.existsSync(pathToFile)) {
			let data = await fs.readFile(pathToFile, 'utf-8');
			let users = JSON.parse(data);
			let newUsers = users.map((user) => {
				if (user.id === id) {
					updateUser.id = id;
					return updateUser;
				} else {
					return user;
				}
			});
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newUsers, null, 2)
			);
			return { status: 'success', message: 'usuario actualizado' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	deleteUser = async (id) => {
		if (fs.existsSync(pathToFile)) {
			let data = await fs.readFile(pathToFile, 'utf-8');
			let users = JSON.parse(data);
			let newUsers = users.filter((user) => user.id !== id);
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newUsers, null, 2)
			);
			return { status: 'success', message: 'usuario eliminado' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	deleteAll = () => {
		try {
			let data = JSON.stringify([], null, 2);
			fs.writeFileSync(this.archivo, data);
		} catch (error) {
			console.log(`No existe el archivo ${this.archivo}`);
		}
	};
}

module.exports = Manager;
