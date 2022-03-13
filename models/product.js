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

     category_id:{
         type:String,
         required:true
     },
     userregistrations: [{
            type: moongse.Schema.Types.ObjectId,
            ref: "userregistrations"
    }],
      user_id:{
          type:String,
          required:true
      }

})

const Product = moongse.model('product', product)

module.exports = Product