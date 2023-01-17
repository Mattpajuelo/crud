const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let nuevoGuardar =(guardar)=> fs.writeFileSync(productsFilePath,JSON.stringify(guardar,null,4),'utf-8')
const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		
			return res.render('products',{products})
		}
	,

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = +req.params.id
		let producto=products.find(produc=>produc.id==id)
		
		return res.render('detail',{producto})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let { name, description, price, discount, category} = req.body
		let nuevoid=products.length +1

				let produc={
					id:nuevoid,
					name:name,
					description:description,
					price:price,
					discount:discount,
					category:category,
					image: "img-laptop-lenovo.jpg"
				}
				
		products.push(produc)
		nuevoGuardar(products)
		return res.redirect('/products/'+nuevoid)
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let id = +req.params.id
		let producto=products.find(produc=>produc.id==id)
		return res.render('product-edit-form',{producto})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let id = +req.params.id
		let { name, description, price, discount, category} = req.body
		products.forEach(produc=>{
			if(produc.id==id){
				produc.name=name,
				produc.description=description,
				produc.price=price,
				produc.discount=discount,
				produc.category=category
				
			}
			
		})
		nuevoGuardar(products)
		return res.redirect('/products/'+id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = +req.params.id
		products=products.filter(product=> product.id !== id)
		nuevoGuardar(products)
		return res.redirect('/products')
	}
};

module.exports = controller;