const JWT=require("jsonwebtoken")
const {hashPassword,comparePassword}=require("../helpers/authhelp.js")
const users=require("../models/users")
exports.registerController=async (req,res)=>{
try{
const{name,email,password,phone,address,answer}=req.body
if(!name)
{
    return res.send({message:"Name is required"})
}
if(!email)
    {
    return res.send({message:"Email is required"})
    }
if(!password)
    {
        return res.send({message:"Password is required"})
}
if(!phone)
    {
     return res.send({message:"Phone no. is required"})
    }
    const JWT=require("jsonwebtoken")
    const {hashPassword,comparePassword}=require("../helpers/authhelp.js")
    const users=require("../models/users")
    exports.registerController=async (req,res)=>{
    try{
    const{name,email,password,phone,address}=req.body
    if(!name)
    {
        return res.send({message:"Name is required"})
    }
    if(!email)
        {
        return res.send({message:"Email is required"})
        }
    if(!password)
        {
            return res.send({message:"Password is required"})
         }
    if(!phone)
        {
         return res.send({message:"Phone no. is required"})
        }
    if(!address)
         {
        return res.send({message:"Address is required"})
         }
         if(!answer)
            {
           return res.send({message:"Answer is required"})
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
    const user=new users({name,email,phone,address,password:hashedPassword,answer})
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
        expiresIn:"30d"
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
    exports.forgotPasswordController=async(req,res)=>{
    try{
    const {email,answer,newPassword}=req.body
    if(!email)
    {
       res.status(400).send({
        message:"email is required"
       }) 
    }
    if(!answer)
        {
           res.status(400).send({
            message:"Question is required"
           }) 
        }
    if(!newPassword)
            {
               res.status(400).send({
                message:"New password is required"
               }) 
    }
    const user=await users.findOne({email,answer})
    if(!user)
    {
      return res.status(404).send({
        success:false,
        message:"Wrong email or answer"
      })
    }
    const hashed=await hashedPassword(newPassword)
    await users.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:"password reset successfully"
    })
    }
    catch(error){
    console.log(error)
    res.status(500).send({
     success:false,
     message:"something went wrong",
    error
    })
    }
    };
    
    
    
    module.exports.testController = (req, res) => {
        console.log("protected route");
        res.send("Protected route accessed");
    };
    


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

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).send({
                success: false,
                message: "Error in login",
                error,
            });
        }
    }
};


exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            });
        }

        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer to the question is required"
            });
        }

        if (!newPassword) {
            return res.status(400).send({
                success: false,
                message: "New password is required"
            });
        }

        const user = await users.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            });
        }

        const hashed = await hashPassword(newPassword);
        await users.findByIdAndUpdate(user._id, { password: hashed });

        return res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("Error in forgotPasswordController:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
exports.updateUserProfile = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
  
      // Find the user by ID
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Update user fields
      user.name = name || user.name;
      user.address = address || user.address;
      user.phone = phone || user.phone;
  
      if (password) {
        user.password = password;
      }
  
      // Save updated user information
      const updatedUser = await user.save();
  
      res.json({
        success: true,
        message: 'Profile updated successfully',
        updatedUser,
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while updating the profile.',
      });
    }
  };



module.exports.testController = (req, res) => {
    console.log("protected route");
    res.send("Protected route accessed");
};

