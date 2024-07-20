const express= require('express');
const router = new express.Router();
const Products= require("../models/productsSchema.js")
const USER = require("../models/userSchema.js")
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate.js")
const jwt =  require("jsonwebtoken");
const secretKey= process.env.KEY;

router.get("/getproducts", async(req, res)=>{
    try{
            const productsdata= await Products.find();
            // console.log("ye le bro");
            // console.log(productsdata);
            res.status(201).json(productsdata);
    }
    catch(error)
    {
        console.log("error a gyi");
        console.log("error message is ", error.message);
    }
})


router.get("/getproductsone/:id", async(req,res)=>{
    try{
        const {id}= req.params;
        // const individualdata= await Products.find({_id: id});
        const individualdata= await Products.findById(id);
        console.log(individualdata);
        res.status(201).json(individualdata);
    }
    catch(error)
    {
        console.log("error");
    }
})

router.post("/register", async(req,res)=>{
    console.log(req.body);
    const {fname, mobile, email, password, cpassword } = req.body;
    if(!fname || !mobile || !email || !password || !cpassword)
    {
        res.status(422).json({error: "fill all the data"});
        console.log("data not correct");
    };
    try{
        const preuser = await USER.findOne({email: email});
        if(preuser)
        {
            res.status(422).json("this user is already present");
        }
        else if(password !== cpassword)
        {
            res.status(422).json("password and cpassword not same");
        }
        else
        {
            const finaluser = new USER({
                fname, mobile, email, password, cpassword
            });
            const storedata= await finaluser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    }
    catch(error)
    {
        console.log("catch error from router.js page")
        res.status(422).send(error)
    }
})

router.post("/login", async(req,res) => {
    console.timeLog(req.body)
    const {email, password} = req.body;
    if(!email || !password)
    {
        console.log("enter valid email and password");
        res.status(422).json({error: "fill all the data"});
    }
    try{
        const userlogin= await USER.findOne({email: email});
        console.log("userlogin",userlogin);
        if(userlogin)
        {
            const isMatch= await bcrypt.compare(password, userlogin.password);
            console.log("2",isMatch)

            const token = await userlogin.generateAuthtoken();
            console.log("3",token);
            res.cookie("ecommerce",token,{
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            });
            // console.log("cookie",res)

            if(!isMatch)
            {
                console.log("invalid creds passed")
                res.status(400).json({error: "invalid credentials pass" });
            }
            else
            {
                console.log("4")
                res.status(201).json(userlogin)
            }
        }
        else
        {
            res.status(400).json({error: "invalid credentials pass2" });   
        }
    }
    catch(error)
    {

    }   
})

router.post("/addcart/:id",authenticate, async(req, res)=>{
    console.log("hi")
    try{
        const {id}= req.params;
        console.log(id);
        const UserContact= await Products.findOne({_id:id});
        console.log("uc",UserContact);
        if(UserContact)
        {
            // const cartData= await UserContact.addcartdata(cart);
            // await UserContact.save();
            // console.log(cartData);
            // res.status(201).json(UserContact);
            console.log("going in this API addcart")
        }
        else
        {
            res.status(401).json({error:"invalid user"});
        }
    }
    catch(error){
        res.status(401).json({error:"invalid user"});
        console.log("error in catch of addtocart router.js page", error);
    }
})

module.exports = router;
