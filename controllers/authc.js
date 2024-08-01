const JWT=require("jsonwebtoken")
const {hashPassword,comparePassword}=require("../helpers/authhelp.js")
const users=require("../models/users")
exports.registerController=async (req,res)=>{
try{
const{name,email,password,phone,address}=req.body
if(!name)
{
    return res.send({error:"Name is required"})
}
if(!email)
    {
    return res.send({error:"Email is required"})
    }
if(!password)
    {
        return res.send({error:"Password is required"})
     }
if(!phone)
    {
     return res.send({error:"Phone no. is required"})
    }
if(!address)
     {
    return res.send({error:"Address is required"})
     }

const previoususer=await users.findOne({email})
if(previoususer)
{
    return res.status(200).send({
        success:false,
        message:"user is already registered,can move to signup"
    })
}

const hashedPassword=await hashPassword(password)
const user=new users({name,email,phone,address,password:hashedPassword})
await user.save()
res.status(201).send({
    success:true,
    message:"user registered successfully",
    user,
})
}
catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:"error in registration",

})
}
}


exports.loginController=async(req,res)=>{
try{
const {email,password}=req.body
if(!email||!password)
{
  return res.status(400).send({
    success:false,
    message:"invalid email or password"
  })  
}

const user=await users.findOne({email})
if(!user)
{
    return res.status(404).send({
        success:false,
        message:"email is not registered"
    })
}
const match=await comparePassword(password,user.password)
if(!match)
{
    res.status(401).send({
        success:false,
        message:"invalid password"
    })
}
const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
    expiresIn:"7d"
});
res.status(200).send({
    success:true,
    message:"loggedin successfully",
    user:{
       name:user.name, 
       email:user.email,
       phone:user.phone,
       address:user.address
    },
    token,
})
}
catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:"error in login",
    error
})
}
}
