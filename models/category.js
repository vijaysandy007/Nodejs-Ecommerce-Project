const moonge = require('mongoose');

const categorySchema = moonge.Schema({
    category_name:{
        type:String
    },
})

const categoryModel = moonge.model('category', categorySchema)

module.exports = categoryModel