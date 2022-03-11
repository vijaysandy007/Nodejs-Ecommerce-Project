const express = require('express');
const router = express.Router();
const categorySchema = require('../models/category')

router.post('/createCategory', async (req,res)=>{
    
    const categroyCreate = await categorySchema({
        category_name: req.body.category_name
    })

    try {
         
        if(!categroyCreate){
            return res.status(400).send('Catwgory cannot be created');
        }
        await categroyCreate.save();
        res.status(200).json({success:true, message:'Great category created :)', data:categroyCreate})

    } catch (error) {
        res.status(500).json({success:false, message:'Great category created :(', error})
    }

})

router.get('/getCategory', async (req,res)=>{
    const getAllCollection = await categorySchema.find()

    if(!getAllCollection){
        return res.status(400).send('Category cannot get collections');
    }
    else{
        res.status(200).json({success:true, message:'Collection Fetched successfully :)', data:getAllCollection})
    }
})

router.get('/categoryById/:id', async (req,res)=>{
    const getCollectionById = await categorySchema.findById({_id: req.params.id})

    if(!getCollectionById){
        return res.status(400).send('Category cannot get collections')
    }
    else{
        res.status(200).json({success:true, message: getCollectionById.category_name +  ' ' + 'category Fetched successfully :)', data:getCollectionById})
    }
})

router.put('/updateCategoryById/:id', async (req,res)=>{
    const updateCategory = await categorySchema.findByIdAndUpdate({_id:req.params.id}, {
        category_name : req.body.category_name
    },{ new: true })
   
    try {
        if(!updateCategory){
            return res.status(400).send('Category cannot be Update');
        }
    
        else{
          await updateCategory.save();
          
          res.status(200).json({success:true, message: updateCategory.category_name +  ' ' + 'category updated successfully :)', data:updateCategory})
        }
        
    } catch (error) {
        res.status(500).json({success:false, message:'Internal server Issue :(', error})
    }
 
})

router.delete('/category/:id', async (req,res)=>{
    const deleteCategroy = await categorySchema.findByIdAndDelete({_id: req.params.id})

    if(!deleteCategroy){
        return res.status(400).send('categroy id is not found');
    }

    else{
        res.status(200).json({success:true, message: deleteCategroy.category_name +  ' ' + 'category Deleted successfully :)'}) 
    }
})

module.exports = router