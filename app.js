const express = require('express');
const app = express();
const Router = express.Router();
const productRouter = require('./Routes/productRouter');

const server = app.listen(8080, () => console.log('server up!'));

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/productos', productRouter);
