const express = require('express');
const router = express.Router();

const ManagerProduct = require('../manager.js');
const manager = new ManagerProduct('productos.json');

router.get('/', (req, res) => {
	const productos = manager.getAll().then((prod) => {
		res.send({ status: 'Success', result: prod });
	});
});

router.get('/:id', (req, res) => {
	manager
		.getById(Number(req.params.id))
		.then((data) =>
			data
				? res.status(200).send(data)
				: res.status(404).send({ error: 'Product was not found' })
		);
});

router.post('/', (req, res) => {
	if (!req.body.title || !req.body.price || !req.body.thumbnail)
		return res.send({ error: 'data is required' });
	let data = manager.createProduct(req.body).then((prod) => {
		res.send({ status: 'Success', result: prod });
	});
});

router.delete('/:id', (req, res) => {
	manager
		.deleteById(Number(req.params.id))
		.then((result) =>
			result
				? res.status(200).send(`Product ${req.params.id} deleted`)
				: res.status(404).send({ error: 'Product was not found' })
		);
});

router.put('/:id', (req, res) => {
	manager
		.updateProduct(req.params.id - 1, req.body)
		.then((result) =>
			result
				? res.status(200).send(`product ${req.params.id} was updated`)
				: res.status(404).send({ error: 'Product was not found' })
		);
});

module.exports = router;
