const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let ofert=productos.filter(produt=> produt.category=="visited")
		let products=productos.filter(produt=> produt.category=="in-sale")
		return res.render('index',{products,ofert})
	}
};

module.exports = controller;
