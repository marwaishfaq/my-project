import React from 'react';
import Layout from '../../components/Layout/Layout'
import  {useState} from 'react'
 
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
 import '../../styles/AuthStyles.css';
 

 const ForgotPassword = () => {
 
 
    const [email ,setEmail] = useState("")
    const [newPassword ,setnewPassword] = useState("")
    const [answer ,setAnswer] = useState("")
    
    
   const navigate= useNavigate();
    
    
  //form function
  const handleSubmit= async(e)=>{
   e.preventDefault();
      try {
        const res = await axios.post( '/api/v1/auth/ForgotPassword',
            {email,newPassword,answer }
        );
        if(res && res.data.success){
            toast.success(res.data && res.data.message ,{duration:4000, position: 'top-center',
              autoClose: 5000, // 5-second duration
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              transition: 'all 0.5s ease-out',
              opacity: toast.visible ? 1 : 0,
              progress: undefined,})
             
             
            navigate( "/login");
        }else{
            toast.error(res.data.message)
        }
           
      } catch (error) {
        toast.error('something went wrong')
      }
  }   

 
   return (
    <Layout title={'Forgot Password - Ecommerce App'}>
     <div className="form-container">
   
        <form onSubmit={handleSubmit}>
        <h1 className='title'>RESET PASSWORD</h1>
        
  <div className="mb-3">
           <label htmlFor="exampleInputemail" className="form-label">E-mail</label>
        <input
         type="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         className="form-control"
         id="exampleInputemail" 
         required 
         />
      
  </div>
  <div className="mb-3">
           <label htmlFor="exampleInputanswer" className="form-label">What device do you usually use to access our website?</label>
        <input
         type="text"
         value={answer}
         onChange={(e)=>setAnswer(e.target.value)}
         className="form-control"
         id="exampleInputanswer" 
         required 
         />
      
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputpassword1" className="form-label">Password</label>
    <input
     type="password" 
     value={newPassword}
     onChange={(e)=>setnewPassword(e.target.value)}
     className="form-control" 
     id="exampleInputpassword1"
     required
      />
  </div>
  
  
  
  <button type="submit" className="btn btn-primary">RESET</button>
</form>

     </div>
    </Layout>
  )
}
    
 
 export default ForgotPassword
 