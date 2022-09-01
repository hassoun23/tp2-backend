const ManagerProduct = require('./manager.js');

const express = require('express');

const app = express();

const contenedor = new ManagerProduct('productos.txt');

const server = app.listen(8080, () => console.log('Server Up'));
server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.get('/', (request, response) => {
	response.send('<h1>Bienvenidos al servidor express</h1>');
});

app.get('/productos', (request, response) => {
	contenedor.getAll().then((prod) => response.send(prod));
});

app.get('/productosrandom', (request, response) => {
	contenedor
		.getAll()
		.then((prod) =>
			response.menssage(prod[Math.floor(Math.random() * prod.length)])
		);
});
