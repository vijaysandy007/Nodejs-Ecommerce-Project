const express = require('express');
const createProduct = require('../product_controller/product_cont')
const router = express.Router();
const token = require('../token/jwt')
router.use(express.json());
 
router.post('/product',  token.verifyToken, createProduct.createProduct);
router.get('/getProduct',  createProduct.getAllProducts )
router.put('/update/:id', token.verifyToken, createProduct.updateProducts)
router.delete('/delete/:id', token.verifyToken, createProduct.deleteProducts)

//category wise product CRUD

 router.get('/getProductByCategoryId/:id',  token.verifyToken, createProduct.getProductByCategoryId)
 router.get('/getUserProducts/:id',  token.verifyToken, createProduct.getUserProcutById)

module.exports = router