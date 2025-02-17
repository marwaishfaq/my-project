import React, {useState} from 'react'
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
 import '../../styles/AuthStyles.css';

const Register = () => {
    const [name ,setName] = useState("")
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [phone ,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")
   const navigate= useNavigate();
    
    
  //form function
  const handleSubmit= async(e)=>{
   e.preventDefault();
      try {
        const res = await axios.post( '/api/v1/auth/register',
            {name,email,password,phone,address,answer}
        );
        if(res && res.data.success){
            toast.success(res.data && res.data.message)
             
            navigate('/login')
        }else{
            toast.error(res.data.message)
        }
           
      } catch (error) {
        toast.error('something went wrong')
      }
  }   

  return (
    <Layout title={'Register - Ecommerce App'}>
     <div className="form-container">
   
        <form onSubmit={handleSubmit}>
        <h1 className='title'>register form</h1>
        <div className="mb-3">
           <label htmlFor="exampleInputname" className="form-label">Name</label>
        <input
         type="text"
         value={name}
         onChange={(e)=>setName(e.target.value)}
         className="form-control"
         id="exampleInputname" 
         required
        />
         
  </div>
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
  <div className="mb-3">
           <label htmlFor="exampleInputphone" className="form-label">Phone.no</label>
        <input
         type="text"
         value={phone}
         onChange={(e)=>setPhone(e.target.value)}
          className="form-control"
           id="exampleInputphone" 
           required
            
            />
    
  </div>
  <div className="mb-3">
           <label htmlFor="exampleInputaddress" className="form-label">Address</label>
        <input
         type="text"
         value={address}
         onChange={(e)=>setAddress(e.target.value)}
          className="form-control"
           id="exampleInputaddress"  
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
  
  
  <button type="submit" className="btn btn-primary">REGISTER</button>
  
 
</form>

     </div>
    </Layout>
  )
}

export default Register
