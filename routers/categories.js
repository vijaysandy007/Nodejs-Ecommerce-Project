const express = require('express');
const router = express.Router();
const categoryControl = require('../category_controller/category_cont')
const token = require('../token/jwt')
router.post('/createCategory', token.verifyToken, categoryControl.createCategory)
router.get('/getCategory', categoryControl.getAllCategory)
router.get('/categoryById/:id',  categoryControl.getCategoryById)
router.put('/updateCategoryById/:id', token.verifyToken, categoryControl.updateCategoryById)
router.delete('/category/:id', token.verifyToken, categoryControl.deleteCategroyById )

module.exports = router