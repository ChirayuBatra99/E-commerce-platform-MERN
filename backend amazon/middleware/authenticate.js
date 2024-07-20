const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = process.env.KEY

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.ecommerce;
        console.log("request" , req.cookies)
        if(!token)
            console.log("no token");
        const verifyToken = jwt.verify(token, keysecret);
        const rootUser= await USER.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser)
        {
            throw new Error("User Not Found");
        }
        req.token= token;
        req.rootUser= rootUser;
        req.userID= rootUser._id;

        next();
    }
    catch(error)
    {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
}

module.exports = authenticate;