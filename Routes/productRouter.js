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
	let data = manager.getById(req.params.id);
	if (!data) return res.send({ error: 'product was not found' });
	res.send(data);
});

router.post('/', (req, res) => {
	if (!req.body.title || !req.body.price || !req.body.thumbnail)
		return res.send({ error: 'data is required' });
	let data = manager.createProduct(req.body);
	res.send(data);
});

router.delete('/:id', (req, res) => {
	const data = manager.deleteById(req.params.id);
	res.send(data);
});

router.put('/:id', (req, res) => {
	if (!req.body.title || !req.body.price || !req.body.thumbnail)
		return res.send({ error: 'data is required' });
	let data = manager.update(req.params.id, req.body);
	if (!data) return res.send({ error: 'product was not found' });
	res.send(data);
});

module.exports = router;
