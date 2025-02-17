import React from 'react'
import Layout from '../components/Layout/Layout.js';
import "../styles/about.css";
import makingprocess from '../styles/img/makingprocess.jpeg'
import teammember1 from '../styles/img/teammember1.jpeg'
import teammember2 from './../styles/img/teammember2.jpeg'
import teammember3 from '../styles/img/teammember3.jpeg'

const About = () => {
  return (
    <Layout title={'About-us'}>
        <div className="about-page">
      <header className="hero">
        <h1>Welcome to Furniture World</h1> <br></br><br></br>
        
      </header>
      <section className="about-us">
        <h2>About Us</h2>
        <p>At Furniture World, we're passionate about creating beautiful and functional pieces for your home. 
          With a rich history of furniture making, our family-owned business is dedicated to quality and craftsmanship.
           Our team of skilled craftsmen use only the finest materials to create unique and stylish pieces. 
           From modern designs to classic styles, we have something for everyone.
            We're committed to providing exceptional customer service and ensuring that every piece of furniture that leaves our workshop meets the highest standards.
             By choosing Furniture World, you're supporting a family-owned business that truly cares about its customers.
             Our website uses industry-standards to ensure that your personal and payment information is protected and secure.
              Additionally, our secure payment gateway is PCI-DSS compliant, providing you with peace of mind when shopping with us.
              We have certain payment criteria that require a 60% advance payment, with the remaining 40% payable upon delivery.
        </p>
        <img src={makingprocess} alt="Furniture Making Process" />
      </section>
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={teammember1} alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Founder and CEO</p>
          </div>
          <div className="team-member">
            <img src={teammember2} alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Designer and Craftsman</p>
          </div>
          <div className="team-member">
            <img src={teammember3} alt="Team Member 3" />
            <h3>Bob Johnson</h3>
            <p>Marketing and Sales</p>
          </div>
        </div>
      </section>
    </div>
 
    </Layout>
  )
}

export default About
