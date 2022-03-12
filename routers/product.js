const Product = require('../models/product')
const express = require('express');
const createProduct = require('../product_controller/product_cont')
const router = express.Router();
router.use(express.json())
 
router.post('/product', createProduct.createProduct);
router.get('/getProduct', createProduct.getAllProducts )
router.put('/update/:id', createProduct.updateProducts)
router.delete('/delete/:id', createProduct.deleteProducts)

//category wise product CRUD

 router.get('/getProductByCategoryId/:id', createProduct.getProductByCategoryId)
 router.get('/getUserProducts/:id',createProduct.getUserProcutById)

module.exports = router