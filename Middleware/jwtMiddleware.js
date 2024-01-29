const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    console.log("Inside Middleware")
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token,"mytoken"); 
    try {
        const jwtResponse = jwt.verify(token, "secretkey123")
        req.payload = jwtResponse.userId
        console.log(jwtResponse.userId); 
        next()
    } catch (err) {
        res.status(401).json('Autherization Failed!!! Please Login')
    }
}
module.exports = jwtMiddleware