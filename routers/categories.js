const express = require('express');
const router = express.Router();
const categoryControl = require('../category_controller/category_cont')


router.post('/createCategory', categoryControl.createCategory)

router.get('/getCategory', categoryControl.getAllCategory)

router.get('/categoryById/:id', categoryControl.getCategoryById)

router.put('/updateCategoryById/:id', categoryControl.updateCategoryById)

router.delete('/category/:id',categoryControl.deleteCategroyById )

module.exports = router