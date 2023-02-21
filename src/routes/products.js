// ************ Requerir ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controlador Requerido ************
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function(req, file, cb) {
        console.log(file);
        let filex = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        console.log(filex);
        cb(null, filex);     
    }
})

const upload = multer({ storage });

/*** OBTENER TODOS LOS PRODUCTOS ***/ 
router.get('/', productsController.index); 

/*** CREAR UN PRODUCTO ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.single('productImage') , productsController.store); 


/*** OBTÉN UN PRODUCTO ***/ 
router.get('/:id', productsController.detail); 

/*** EDITAR UN PRODUCTO ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/', productsController.update); 


/*** ELIMINAR UN PRODUCTO ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
