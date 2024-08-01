const express =require("express")
const app=express();
const mongoose=require("mongoose")
const auth=require("./routes/auth.js")
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

require('dotenv').config();

app.use(express.json());
app.use('/auth',auth)

app.get('/',(req,res)=>{
    res.send("welcome to my ecommerce app")
})

app.listen(8080,()=>{
    console.log("server running on port 8080");
})