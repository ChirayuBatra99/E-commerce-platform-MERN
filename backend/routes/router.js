const express= require('express');
const router = new express.Router();
const Products= require("../models/productsSchema.js")
const USER = require("../models/userSchema.js")
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate.js")
const jwt =  require("jsonwebtoken");
const Popularproducts = require('../models/popularProductsSchema.js');

router.get("/getproducts/dealofday", async(req, res)=>{
    try{
            const productsdata= await Products.find();
            res.status(201).json(productsdata);
    }
    catch(error)
    {
        console.log("error a gyi");
        console.log("error message is ", error.message);
    }
})

router.get("/getproducts/popularproducts", async(req, res)=>{
    try{
            const productsdata= await Popularproducts.find();
            res.status(201).json(productsdata);
    }
    catch(error)
    {
        console.log("error a gyi");
        console.log("error message is ", error.message);
    }
})

router.post("/tellpopular", async(req,res)=>{
    try{
        const {id, url, detailUrl, title, price, description, discount, tagline} = req.body;
        const popproducts = new Popularproducts({
            id, url, detailUrl, title, price, description, discount, tagline
        });
        const storedata= await popproducts.save();
        res.status(201).json(storedata);

    }
    catch(error)
    {

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
    // console.timeLog(req.body)
    const {email, password} = req.body;
    if(!email || !password)
    {
        console.log("enter valid email and password");
        res.status(422).json({error: "fill all the data"});
    }
    try{
        const userlogin= await USER.findOne({email: email});
        // console.log("userlogin",userlogin);
        if(userlogin)
        {
            const isMatch= await bcrypt.compare(password, userlogin.password);
            // console.log("2",isMatch)

            const token = await userlogin.generateAuthtoken();
            // console.log("3",token);
            res.cookie("Amazonweb",token,{
                expires: new Date(Date.now() + 900000),
                httpOnly: true,
            });
            console.log("cookie sent");
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

router.delete("/remove/:id", authenticate, async(req,res)=>{
    try{
        console.log("here bro1");
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((curel)=>{
            return curel.id != id;
        });
        req.rootUser.save();
        console.log("here bro");
        res.status(201).json(req.rootUser);
        console.log("item removed");
    }
    catch(error){
        console.log(error, "error in router page at remove api");
        res.status(400).json(error);
    }
});

router.get("/getproductsone/dealofday/:id", async(req,res)=>{
    console.log("hi");
    try{
        const {id}= req.params;
        const individualdata= await Products.findById(id);
        res.status(201).json(individualdata);
    }
    catch(error)
    {
        console.log("error");
    }
})

router.get("/getproductsone/popularproducts/:id", async(req,res)=>{
    try{
        const {id}= req.params;
        const individualdata= await Popularproducts.findById(id);
        res.status(201).json(individualdata);
    }
    catch(error)
    {
        console.log("error");
    }
});

router.post("/addcart/dealofday/:id",authenticate, async(req, res)=>{
    try{
        const {id} = req.params;
        const cart = await Products.findOne({_id:id});
        const UserContact= await USER.findOne({_id:req.userID});
        if(UserContact)
        {
            const cartData= await UserContact.addcartdata(cart);
            await UserContact.save();
            res.status(201).json(UserContact);
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
});

router.post("/addcart/popularproducts/:id",authenticate, async(req, res)=>{
    try{
        const {id} = req.params;
        const cart = await Popularproducts.findOne({_id:id});
        const UserContact= await USER.findOne({_id:req.userID});
        if(UserContact)
        {
            const cartData= await UserContact.addcartdata(cart);
            await UserContact.save();
            res.status(201).json(UserContact);
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
});

router.get("/cartdetails", authenticate, async(req, res)=>{
    try{
        const buyuser= await USER.findOne({_id: req.userID});
        res.status(201).json(buyuser)
    }
    catch(error){
        console.log(error, "error at cartdetails route");
    }
});

router.get("/validuser", authenticate, async(req, res)=>{
    try {
        const validUserOne= await USER.findOne({_id: req.userID});
        console.log(validUserOne, "validuser api in router page");
        res.status(201).json(validUserOne);
    }
    catch(error)
    {
        console.log(error, "error in catch block of validuser api router page");
    }
});


router.get("/logout", authenticate, async(req, res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curel)=>{
            return req.token != curel.token
        });
        res.clearCookie("Amazonweb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logged out");
    }
    catch(error){
        res.status(400).json({error: "failed here"})
        console.log(error, "error in logging out");
    }
});

module.exports = router;