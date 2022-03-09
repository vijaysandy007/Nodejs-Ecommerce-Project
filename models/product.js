const moongse = require('mongoose');

const product = new moongse.Schema({
 
    publisher_name:{
        type: String,
        required:true
    },
    book_name:{
        type: String,
        required:true
    },
    page_size:{
        type: Number,
        required:true
    }
})

const Product = moongse.model('book_collection', product)

module.exports = Product