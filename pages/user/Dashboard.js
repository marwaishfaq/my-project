import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../Context/Auth'
import UserMenu from '../../components/Layout/UserMenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={'Dashboard - Ecommerce App'}>
        <div className='container-fluid mg-3 p-3'>
       <div className='row'>
        <div className='col-md-3'>
         <UserMenu/>

        </div>
        <div className='col-md-8'>
          
          <div className='card w-70 p-3'>
              <h3>user name: {auth?.user?.name}</h3>
              <h3>user email: {auth?.user?.email}</h3>
              <h3>user phone: {auth?.user?.phone}</h3>
              <h3 > address: {auth?.user?.address}</h3>
          </div>
          
          </div>
      </div>
      </div>
    </Layout>
  )
}

export default Dashboard
