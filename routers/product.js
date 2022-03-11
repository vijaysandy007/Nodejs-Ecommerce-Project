const Product = require('../models/product')
const express = require('express');

const router = express.Router();

router.use(express.json())
 
router.post('/', async (req,res)=>{

    const productModel = new Product({
        product_name: req.body.product_name,
        description: req.body.description,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        category_id: req.body.category_id,
        user_id: req.body.user_id
    })

    try {

         if(!productModel){
             return res.status(400).send('Product cannot be created')
         }

         else{
            await  productModel.save();
            res.status(201).json({success: true, productModel})
         }

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
        product_name: req.body.product_name,
        description: req.body.description,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        category_id: req.body.category_id,
        user_id: req.body.user_id
        
    })

    try {
      await updateProdcut.save();
     
        res.status(200).json({success: true ,updateProdcut})
    } catch (error) {
        res.status(400).json({success: false, error})
    }
})

router.delete('/:id', async (req,res)=>{

    const deletProduct = await Product.findByIdAndDelete(req.params.id)

    try {
        res.status(200).json({success: true ,deletProduct})

        
    } catch (error) {
        res.status(400).json({success: false})
    }
})


//category wise product CRUD

 router.get('/getProductByCategoryId/:id', async (req,res)=>{

    const getProductByCatId = await Product.find({category_id: req.params.id})
      try {

        if(!getProductByCatId){
            return res.status(400).send('category id not found')
         }
     
         else{
           res.status(200).json({success:true, data:getProductByCatId})
         }
          
      } catch (error) {
           res.status(500).send(error)
      }

 })

 router.get('/getUserProducts/:id', async (req,res)=>{
    const getuserProduct = await Product.find({user_id: req.params.id})

    try {

        if(!req.params.id){
            return res.status(400).send('user id not found')
         }
     
         else{
           res.status(200).json({success:true, data:getuserProduct})
         }
          
      } catch (error) {
           res.status(500).send(error)
      }

 })

module.exports = router