const express=require("express")
const {registerController,loginController,testController,forgotPasswordController,updateUserProfile}=require("../controllers/authc.js")
const {requireSignIn,isAdmin} =require ("../middlewares/authmiddleware.js")  


// Route to update user profile




const router=express.Router()
router.post("/register",registerController)
router.post("/login",loginController)
router.post("/forgot-password",forgotPasswordController)

router.get("/test",requireSignIn,isAdmin,testController)



router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
router.put('/profile', requireSignIn, updateUserProfile);
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{{
    res.status(200).send({ok:true})
}})

module.exports=router;

