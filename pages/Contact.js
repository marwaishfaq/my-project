import React, { useState } from "react";
import Layout from '../components/Layout/Layout'
 import '../styles/contact.css'
import GoogleMapComponent from '../components/GoogleMap';
import toast from 'react-hot-toast'
const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const location = {
    lat: 31.5542,
  lng: 74.3262,
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        setContact({
          username: "",
          email: "",
          message: "",
        });
        const data = await response.json();
        console.log(data);
         
      }
    } catch (error) {
      alert("message not send");
      console.log("message not sent");
    }
  };

  return (
    <Layout title={'Contact-us page'}>
     <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with us for any queries or visit our store location.</p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={contact.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">message:</label>
          <textarea
            id="message"
            name="message"
            value={contact.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneno">phoneno:</label>
          <input
            type="number"
            id="phoneno"
            name="phoneno"
            value={contact.phoneno}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"  onClick={()=>{
                     
                     
                    toast.success('message send successfully')
                   }}>Send Message</button>
      </form>

      {/* Store Location */}
      <h2>Visit Our Store</h2>
      <div className="store-location">
        <p>Address: {process.env.REACT_APP_STORE_ADDRESS}</p>
        <p>Phone: {process.env.REACT_APP_STORE_PHONE}</p>
        <p>Email: {process.env.REACT_APP_STORE_EMAIL}</p>
      </div>
     
      <div>
      <GoogleMapComponent location={location} />
    </div>
    </div>
     <br></br>
    </Layout>
  )
}

export default Contact
