const Manager = require('./manager');
const manager = new Manager();

let user = {
	first_name: 'John',
	last_name: 'Doe',
	username: 'John Smith',
	age: 36,
	mail: 'john@hotmail.com',
};

manager.createUser(user).then((result) => console.log(result));
manager.findAll().then((result) => console.log(result));
