const moonge = require('mongoose')

const registerSchema = moonge.Schema({
   name:{
    type: String
   },
    email:{
        type: String,
        unique: true,
        required : true
    },

    password: {
        type: String,
        required: true
    }
})

const registerModel = moonge.model('userregistrations', registerSchema)

module.exports = registerModel