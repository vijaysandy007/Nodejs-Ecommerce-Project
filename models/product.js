const moongse = require('mongoose');

const product = new moongse.Schema({
 
    product_name:{
        type: String,
        required:true
    },
 
    description:{
        type: String,
        required:true
    },

    product_price:{
      type:Number,
      required:true
    },

    product_image:{
      type:String,
      required:true
    },
    isFeatured:{
      type:Boolean,
      default:false
    },
    dateCreated:{
     type:Date,
     default:Date.now
    },

     category_id:{
         type:moongse.SchemaTypes.ObjectId,
         ref:'category',
         required:true
     },
     user_id: {
            type:moongse.SchemaTypes.ObjectId,
            ref: "userregistrations",
           required:true
            
    },
   
    
})

const Product = moongse.model('product', product)

module.exports = Product