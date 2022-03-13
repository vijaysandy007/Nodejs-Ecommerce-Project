const Product = require('../models/product')
const userSchema = require('../models/users')

const createProduct = async (req,res) =>{
     
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
}
//***************************END********************************//

const getAllProducts = async (req,res) =>{

    try {
         
      const getAllPostWithUser = await Product.find().populate({path:'users', select:['name']})
      res.status(200).json(getAllPostWithUser)
    
    } catch (error) {
     res.status(400).json({success: false})
    }

}

//***************************END********************************//

const updateProducts = async (req,res) =>{
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
}


//***************************END********************************//

const deleteProducts = async (req,res)=>{

    const deletProduct = await Product.findByIdAndDelete(req.params.id)

    try {
        res.status(200).json({success: true ,deletProduct})

        
    } catch (error) {
        res.status(400).json({success: false})
    }
}


//***************************END********************************//

const getProductByCategoryId = async (req,res)=>{

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

 }

 //***************************END********************************//

 const getUserProcutById =  async (req,res)=>{
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

 }


module.exports ={
    createProduct,
    getAllProducts,
    updateProducts,
    deleteProducts,
    getProductByCategoryId,
    getUserProcutById
}
