const express = require('express')
const router = express.Router();
const registerModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.use(express.json())

router.post('/', async (req, res)=>{

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
})

router.post('/login', async (req,res)=>{

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

})

router.put('/userDetialUpdate/:id', async (req,res)=>{

  let hassedpassword = bcrypt.hashSync(req.body.password, 10)
  console.log(hassedpassword)

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
      
})


module.exports = router