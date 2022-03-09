const moongse = require('mongoose')

require('dotenv').config()

const db = moongse.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, {useUnifiedTopology: true}).then(()=>{

    console.log('db connected')
    }, (err)=>{
        console.log('Some thing went wrong' + err);
    })

    module.exports = db