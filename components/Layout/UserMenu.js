import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <>
    <div className='text-center'>
   <div className='list-group'>
    <h4>Dashboard</h4>
  <NavLink to="/Dashboard/User/Profile"
   className="list-group-item list-group-item-action">Manage Profile
   </NavLink>
  <NavLink to="/Dashboard/User/Orders"
   className="list-group-item list-group-item-action">  Orders
   </NavLink>
  
  </div>
  </div>
    </>

  )
}

export default UserMenu
