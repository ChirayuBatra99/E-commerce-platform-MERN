const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = process.env.KEY

const authenicate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;
        const verifyToken = jwt.verify(token,keysecret);
     
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
       

        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
            console.log("user authenticated")

        next();  


    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = authenicate;





// const jwt = require("jsonwebtoken");
// const User = require("../models/userSchema");
// const keysecret = process.env.KEY

// const authenticate = async(req,res,next)=>{
//     try {
//         const token = req.cookies.ecommerce;
//         if(!token)
//             console.log("no token");
//         console.log("token",token);
//         const verifyToken = jwt.verify(token, keysecret);
//         console.log(verifyToken._id,"..",verifyToken);
//         const rootUser= await User.findOne({_id:verifyToken._id, "tokens.token":token});
//         console.log(rootUser);      
//         if(!rootUser)
//         {
//             throw new Error("User Not Found");
//         }
//         req.token= token;
//         req.rootUser= rootUser;
//         req.userID= rootUser._id;
//         next();
//     }
//     catch(error)
//     {
//         res.status(401).send("UNauthorized:No token provided");
//         console.log(error);
//     }
// }

// module.exports = authenticate;