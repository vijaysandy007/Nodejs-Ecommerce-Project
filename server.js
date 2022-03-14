 require('dotenv').config()
const express = require('express');
const app = express();

//Routes
const db = require('./database_connections/product_db')
const productRouter = require('./routers/product');
const categoriesRouter = require('./routers/categories');
const orders = require('./routers/orders')
const users = require('./routers/users');
 


//API MiddleWare Routes
app.use(productRouter ).use(users).use(categoriesRouter)


//Read Json Data
app.use(express.json())

//Server PORT 3000
app.listen(3000, ()=>{
    console.log('Server started on PORT 3000')
})
