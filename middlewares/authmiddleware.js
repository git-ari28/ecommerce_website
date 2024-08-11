const JWT = require('jsonwebtoken');
const users = require('../models/users');

const requireSignIn = async (req, res, next) => {
    try {
        // Verify the JWT token
        const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);

        // Attach the decoded token to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and return a 401 Unauthorized response
        console.error(error);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};


const isAdmin=async(req,res,next)=>{
   try{
const user=await users.findById(req.user._id)
if(user.role!==1)
{
    return res.status(401).send({
        success:false,
        message:"Unauthorised access"
    })
}
else{
    next();
}
   }
   catch(error){
console.log(error);
res.status(401).send({
    success:false,
    error,
    message:"error in admin middleware"
})
   } 
} 
module.exports={requireSignIn,isAdmin};