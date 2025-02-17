import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../Context/Auth';
const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={'Admin Dashboard -Ecommerce App'} >
       <div className='container-fluid mg-3 p-3'>
         <div className='row'>
          <div className='col-md-3'>
           <AdminMenu/>

          </div>
          <div className='col-md-8'>
            <div className='card w-70 p-3'>
              <h3>Admin name: {auth?.user?.name}</h3>
              <h3>Admin email: {auth?.user?.email}</h3>
              <h3>Admin phone: {auth?.user?.phone}</h3>
            </div>
          </div>
         </div>
       </div>
    </Layout>
  )
}

export default AdminDashboard
