import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faTwitter,faInstagram,faGoogle } from '@fortawesome/free-brands-svg-icons'
import LOgo from '../Layout/LOgo.png'
const Footer = () => {
   
  return (
   
    <div className='footer text-dark '>
      
    <div class="footer-one">
        <div class="inner-footer">
            <div class="container">
                <div class="footer-top col-lg-12 col-xs-12">
                    <div class="row">
                        <div class="tiva-html col-lg-4 col-md-12 col-xs-12">
                            <div class="block">
                                <div class="block-content">
                                    <p class="logo-footer">
                                        <img src={LOgo} alt="logo" style={{ width: '40%', paddingRight:'50px'}} />
                                        <p class="content-logo">Luxury Ornate Furniture, Crafted with Passion and Precision
                                    </p>
                                    </p>
                                    
                                </div>
                            </div>
                            <div class="block">
                                <div class="block-content">
                                    <ul>
                                        <li>
                                            <Link to='/About'>About Us</Link>
                                        </li>
                                        <li>
                                            <Link to='/Contact'>Contact</Link>
                                        </li>
                                        <li>
                                        <Link to='/Policy'>Privacy Policy</Link>
                                        </li>
                                         
                                    </ul>
                                </div>
                            </div>
                           
                        </div>
                        <div class="tiva-html col-lg-4 col-md-6">
                            <div class="block m-top">
                                <div class="title-block" className='fw-bold'>
                                    Contact Us
                                </div>
                                <div class="block-content">
                                    <div class="contact-us">
                                        <div class="title-content">
                                            <i class="fa fa-home" aria-hidden="true"></i>
                                            <span className='fw-bold'>Address :</span>
                                        </div>
                                        <div class="content-contact address-contact">
                                            <p>Lahore,Pakistan</p>
                                        </div>
                                    </div>
                                    <div class="contact-us">
                                        <div class="title-content">
                                            <i class="fa fa-envelope" aria-hidden="true"></i>
                                            <span className='fw-bold'>Email :</span>
                                        </div>
                                        <div class="content-contact mail-contact">
                                            <p>marwamughal659@gmail.com</p>
                                        </div>
                                    </div>
                                    <div class="contact-us">
                                        <div class="title-content">
                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                            <span className='fw-bold'>Hotline :</span>
                                        </div>
                                        <div class="content-contact phone-contact">
                                            <p>03464399405</p>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="tiva-modules col-lg-4 col-md-6">
                        <div class="contact-us">
                                        <div class="title-content">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            <span className='fw-bold'>Opening Hours :</span>
                                        </div>
                                        <div class="content-contact hours-contact">
                                            <p>Monday - Sunday / 08.00AM - 09.00PM</p>
                                            <span>(Except Holidays)</span>
                                        </div>
                                    </div>
                            <div class="block m-top1">
                                <div class="block-content">
                                    <div class="social-content">
                                        <div class="title-block" className='fw-bold'>
                                            Follow us on
                                        </div>
                                        <div id="social-block">
                                            <div class="social">
                                                <ul class="list-inline mb-0 justify-content-end">
                                                    <li class="list-inline-item mb-0">
                                                        <a href="https://facebook.com" target="_blank">
                                                        <FontAwesomeIcon icon={faFacebook} />
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item mb-0">
                                                        <a href="https://twitter.com" target="_blank">
                                                        <FontAwesomeIcon icon={faTwitter} />
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item mb-0">
                                                        <a href="https://instagram.com" target="_blank">
                                                        <FontAwesomeIcon icon={faInstagram} />
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item mb-0">
                                                        <a href="https://google.com" target="_blank">
                                                        <FontAwesomeIcon icon={faGoogle} />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
     
   
  )
}

export default Footer
