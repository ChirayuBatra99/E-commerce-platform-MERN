import React from 'react'
import styles from './Footer.module.scss'

const year= new Date().getFullYear();

function Footer() {
  return (
    <div>
    <div className={styles.Foot}>
      <div className="footer-details1">
        <h3>Get to Know Us</h3>
        <p>About Us</p>
        <p>Careers</p>
        <p>Press Releases</p>
        <p>Amazon Science</p>
      </div>

      <div className="footer-details2">
        <h3>Connect with us</h3>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Instagram</p>
      </div>

      <div className="footer-details3">
        <h3>Make Money with Us</h3>
        <p>Sell on Amazon</p>
        <p>Sell under Amazon Accelerator</p>
        <p>Protect and Build Your Brand</p>
        <p>Amazon Global Selling</p>
        <p>Become an Affiliate</p>
        <p>Fulfilment by Amazon</p>
        <p>Advertise Your Products</p>
        <p>Amazon Pay on Merchants</p>
      </div>

      <div className="footer-details2">
        <h3>Let Us Help You</h3>
        <p>COVID-19 and Amazon</p>
        <p>Your Account</p>
        <p>Returns Centre</p>
        <p>100% Purchase Protection</p>
        <p>Amazon App Download</p>
        <p>Help</p>
      </div>
    </div>
    <div className='last-details'>
    <p> &nbsp; &nbsp;&nbsp; Conditions of Use & Sale         &nbsp; &nbsp;&nbsp;         &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
    </div>
    </div>
  )
}

export default Footer
