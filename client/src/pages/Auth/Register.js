import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import toast,{Toaster} from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Register = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")
    const [phone,setPhone]=useState("")
    const navigate=useNavigate()

const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
const res= await axios.post("/auth/register",{name,email,password,phone,address})
    if(res&& res.data.success)
    {
        toast.success(res.data && res.data.message)
        navigate("/login")
    }else{
        toast.error(res.data.message)
    }
    }
    catch(error){
console.log(error)
toast.error("something went wrong")
    }
}


  return (
    <Layout>
    <Toaster/>


     <div className="register">
  
  <form onSubmit={handleSubmit}>

  <div>
  <div className="form-group">
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} required/>
    </div>
    <div className="form-group">
    
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email " value={email}onChange={(e)=>setEmail(e.target.value)} required/>
    </div>
    <div className="form-group">
    
    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter password " value={password} onChange={(e)=>setPassword(e.target.value)} required/>
    </div>
    <div className="form-group">
    
    <input type="text" className="form-control" id="address" aria-describedby="emailHelp" placeholder="Enter address" value={address}onChange={(e)=>setAddress(e.target.value)} required/>
    </div>


  <div className="form-group">
   
    <input type="text" className="form-control" id="phone" placeholder="Enter phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
   
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</div>

   
     
  
   
  </form>
</div>

            
    </Layout>
    
  )
}

export default Register