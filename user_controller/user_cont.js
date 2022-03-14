const registerModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res)=>{

   const findDuplicate = await registerModel.findOne({email: req.body.email})
   if(findDuplicate){
      return res.status(400).json({succes:false, message:"Sorry Email already exists :("})
   }

    const user = await new  registerModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)  
    })
     
    try {
 
       await user.save();
       res.status(201).json({success: true, user})
        
    } catch (error) {
     res.status(400).json({success: false})
        
    }
 }

 //***************************END********************************//

 const loginUser = async (req,res)=>{

    try {

      const user = await registerModel.findOne({email: req.body.email})
      if(!user){
       return res.status(400).send({success:false, message:'Access denied email id not found'})
      }

      if(user && bcrypt.compareSync(req.body.password, user.password)){

           const token = jwt.sign({_id: user.id} , 'tokenSecret' )
         
           res.status(200).json({success:true, message:'Access granted', token: token})  
                 
      }

      else{
         res.status(400).json({success:false, message:'Access denied Password is wrong'})
      }
      
    } catch (error) {
      res.status(500).json({success:true, message:'Please check your connection'})
    }

}

//***************************END********************************//

const userDetialUpdate = async (req,res)=>{

    let hassedpassword = bcrypt.hashSync(req.body.password, 10)
  
     let userUpdateDetial = await registerModel.findByIdAndUpdate({_id:req.params.id},{
        name: req.body.name,
        email:req.body.email,
        password:hassedpassword
     })
  
     if(!userUpdateDetial){
      return res.status(400).send('user id is not found');
     }
    
      else{
        await userUpdateDetial.save();
        res.status(200).json({success:true, data:userUpdateDetial})
      }
        
  }

  const getAllUser = async (req,res) =>{
     const {page=1, limit=5} = req.body
     const allUser = await (await registerModel.find().limit(limit *1).skip((page -1)*limit))

     if(!allUser){
        return res.status(400).send('no user found ')
     }

     else{
        res.status(200).json({success:true, data: allUser})
     }
  }

  //***************************END********************************//

 module.exports ={
    registerUser,
    loginUser,
    userDetialUpdate,
    getAllUser
 }