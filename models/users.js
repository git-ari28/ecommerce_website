const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
address:{
type:String,
required:true
},
answer:{
    type:String,
    
},
role:
{
    type:String,
    default:0
}
},{timestamps:true})
module.exports= mongoose.model('users',userSchema)