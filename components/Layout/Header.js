import React, { useState } from 'react'
 import { useAuth } from '../../Context/Auth'
import { NavLink,Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../Context/Cart'
import { Badge } from 'antd'
import LOgo from '../Layout/LOgo.png'
const Header = () => {
  const [cart]=useCart();
  const [auth,setAuth]=useAuth()
  const categories=useCategory();
  const handleLogout = ()=>{
setAuth({
  ...auth,
  user:null,
  token:''
})
localStorage.removeItem("auth");
toast.success("Logout successfully", { duration: 4000 });
  };
  return (
    <div>
    
   <nav className="navbar navbar-expand-lg">
 
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <div style={{ width: '100px' }} className="logo-container" >
    <img src={LOgo} alt="logo" style={{ width: '80%' }} />
  </div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>

     
        <li className="nav-item">
          <NavLink to="/"  className="nav-link "    >Home</NavLink>
        </li>
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
{/*

   
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
 */}
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

        <li className="nav-item">
          <NavLink to="/About" className="nav-link "    >About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/DrawDesign" className="nav-link "  >UploadDesign</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Contact" className="nav-link "   >Contact</NavLink>
        </li>
       { !auth.user ? (
        <>
                   <li className="nav-item">
          <NavLink to="/Register" className="nav-link"  >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Login" className="nav-link"  >Login</NavLink>
        </li>
                  </>
                ) : (
                <> 
                <li className="nav-item dropdown">
  <NavLink 
  className=" nav-link dropdown-toggle"  
  role="button" 
  data-bs-toggle="dropdown"
   aria-expanded="false"
   >
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li>
      <NavLink to= {`/Dashboard/${auth?.user?.role === 1? "Admin" : "user"}`}  
       className="dropdown-item" >Dashboard</NavLink></li>
    <li>
          <NavLink onClick={handleLogout} to="/Login" className="dropdown-item"  >Logout</NavLink>
        </li>
  </ul>
</li>

                  </>
                  )
       }
        <li className="nav-item mt-2">
          <Badge count={cart?.length} showZero>
          <NavLink to="/Cart" className="nav-link ">Cart</NavLink>
          </Badge>
         
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

    </div>
  )
}

export default Header
