import React, {useState} from 'react'
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'
 import '../../styles/AuthStyles.css';
 import { useAuth } from '../../Context/Auth';

const Login = () => {
 
 
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [auth,setAuth]=useAuth()
    
   const navigate= useNavigate();
   const location =useLocation();
    
  //form function
  const handleSubmit= async(e)=>{
   e.preventDefault();
      try {
        const res = await axios.post( '/api/v1/auth/Login',
            {email,password }
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
             setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
             });
             localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state||"/");
        }else{
            toast.error(res.data.message)
        }
           
      } catch (error) {
        toast.error('something went wrong')
      }
  }   

  return (
    <Layout title={'Login - Ecommerce App'}>
     <div className="form-container">
   
        <form onSubmit={handleSubmit}>
        <h1 className='title'>LOGIN FORM</h1>
        
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
    <label htmlFor="exampleInputpassword1" className="form-label">Password</label>
    <input
     type="password" 
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     className="form-control" 
     id="exampleInputpassword1"
     required
      />
  </div>
  <div className='mg-3'>
  <button type="Button" className="btn btn-primary" onClick={()=>{navigate('/ForgotPassword')}}>Forgot Password</button>
  </div>
  <br></br>
  
  
  <button type="submit" className="btn btn-primary">LOGIN</button>
</form>

     </div>
    </Layout>
  )
}

export default Login
