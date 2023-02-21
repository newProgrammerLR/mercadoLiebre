const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Mostrar todos los productos
	index: (req, res) => {
		res.render('products', { products });
	},

	// Detail - Detalle de un producto
	detail: (req, res) => {
		let idProducto = req.params.id;
		let product;
		for (let i=0; i<products.length; i++) {
            if (products[i].id == idProducto) {
				product = products[i];
			}
		}
		res.render('detail', { product } );
	},

	// Create - Formulario para crear
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create - Método para almacenar
	store: (req, res) => {
		let product = req.body;
		product.image = req.file.filename;
		product.id = (products.length + 1);
		products.push(product);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');
		res.redirect('/products')
	},

	// Update - Formulario para editar
	edit: (req, res) => {
		let id = req.params.id;
		globalThis.productToEdit = null;
		for (let i=0; i<products.length; i++) {
			if (products[i].id == id) {
				productToEdit = products[i];
			}
		}
		res.render('product-edit-form', { productToEdit })
	},
	// Update - Método para actualizar
	update: (req, res) => {
		let id = productToEdit.id;
		console.log(id)
		for (let i=0; i<products.length; i++) {
			if (products[i].id == id) {
				products[i].name = req.body.name;
				products[i].price = req.body.price;
				products[i].discount = req.body.discount;
				products[i].category = req.body.category;
				products[i].description = req.body.description;
			}
		}
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
		res.redirect(`/products/`)
	},

	// Delete - Eliminar un producto de la base de datos
	destroy : (req, res) => {
		let id = req.params.id;
		console.log(id);
		products = products.filter(function(product){
			return product.id != id;
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
		res.redirect('/products/')
	},
};

module.exports = controller;