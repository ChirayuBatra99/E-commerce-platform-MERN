require("dotenv").config();
const express = require("express");
const app= express();
const cookieparser= require("cookie-parser")
const cors= require("cors");
require("./db/conn")

const mongoose= require("mongoose");

app.use(express.json());

app.use(cors(
    {   
 }
))


app.use(cookieparser(""))
const router= require('./routes/router')


const USER = require("./models/userSchema.js")
 
const DefaultData= require("./defaultdata")
const port =8005;
app.use(router);
app.listen(port,()=>{
    console.log(`your server is running on port ${port} `);
});
DefaultData();
console.log("broo")



// key in dotenvfile is:  KEY= chirayuchirayuchirayuchirayuchirayu
