const Product = require('../models/product')
const express = require('express');

const router = express.Router();

router.use(express.json())
 
router.post('/', async (req,res)=>{

    const productModel = new Product({
        publisher_name: req.body.publisher_name,
        book_name: req.body.book_name,
        page_size: req.body.page_size,

    })

    try {

       await  productModel.save();

        res.status(201).json({success: true, productModel})
        
    } catch (error) {
        res.status(400).json({success: false})
    }
});

router.get('/', async (req,res)=>{

   const getData = await Product.find({})

   try {
      await res.status(200).json({success: true ,getData})
   } catch (error) {
    res.status(400).json({success: false})
   }
})

router.put('/:id', async (req,res)=>{

    const updateProdcut = await Product.findByIdAndUpdate(req.params.id, {
        publisher_name: req.body.publisher_name,
        book_name: req.body.book_name,
        page_size: req.body.page_size,

        
    })

    try {
      await updateProdcut.save();
     
        res.status(200).json({success: true ,updateProdcut})
    } catch (error) {
        res.status(400).json({success: false, error})
    }
})

router.delete('/:id', async (req,res)=>{

    const deletProduct = await Product.findByIdAndDelete(req.params.id, {
        publisher_name: req.body.publisher_name,
        book_name: req.body.book_name,
        page_size: req.body.page_size,
    })

    try {
        res.status(200).json({success: true ,deletProduct})

        
    } catch (error) {
        res.status(400).json({success: false})
    }
})

module.exports = router