const jwt = require("jsonwebtoken");

const verifyToken =  ( req,res, next) =>{
    try {
        
        const token = req.header("tokenSecret")

        if(!token) return res.status(400).send("Access denied.");

        const decode = jwt.verify(token, "tokenSecret")
        req.user = decode;
        next();

    } catch (error) {
        res.status(400).send("Invalid token");
    }

}
module.exports = {
    verifyToken
}

