import React from 'react'
 import Header from './Header';
 import Footer from './Footer' ;
import {Helmet} from 'react-helmet';
 

import   { Toaster } from 'react-hot-toast';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8'/>
       
  <meta name="author" content={author} />
  <meta name="keywords" content= {keywords}/>
  <meta name="description" content={description} />
 

        <title>{title}</title>
       
      </Helmet>
       <Header/>
     
       <main style={{minHeight:'83vh'}}>
        <Toaster 
        position="top-center"
        autoClose={5000} // 5-second duration
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 5000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
        />
       {children}
       </main>
        <Footer/>
      

        
     
    </div>
  )
}
 Layout.defaultProps ={
  title:'Ecommerce App',
  description:'mern stack project',
  keywords:'mern , react ,node.js,mongoDB',
  author:'Marwa Ishfaq'
 };

export default Layout;
