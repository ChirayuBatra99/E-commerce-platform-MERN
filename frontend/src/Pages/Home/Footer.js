import React from 'react'
import styles from './Footer.module.scss'

const year= new Date().getFullYear();

function Footer() {
  return (
    <div>
    <div className={styles.Foot}>
      <div className="footer-details1">
        <h3>Get to Know Us</h3>
        <p className={styles.hoverFunctionality}>About Us</p>
        <p className={styles.hoverFunctionality}>Careers</p>
        <p className={styles.hoverFunctionality}>Press Releases</p>
        <p className={styles.hoverFunctionality}>Amazon Science</p>
      </div>

      <div className="footer-details2">
        <h3>Connect with us</h3>
        <p className={styles.hoverFunctionality}>Facebook</p>
        <p className={styles.hoverFunctionality}>Twitter</p>
        <p className={styles.hoverFunctionality}>Instagram</p>
      </div>

      <div className="footer-details3">
        <h3>Make Money with Us</h3>
        <p className={styles.hoverFunctionality}>Sell on Amazon</p>
        <p className={styles.hoverFunctionality}>Sell under Amazon Accelerator</p>
        <p className={styles.hoverFunctionality}>Protect and Build Your Brand</p>
        <p className={styles.hoverFunctionality}>Amazon Global Selling</p>
        <p className={styles.hoverFunctionality}>Become an Affiliate</p>
        <p className={styles.hoverFunctionality}>Fulfilment by Amazon</p>
        <p className={styles.hoverFunctionality}>Advertise Your Products</p>
        <p className={styles.hoverFunctionality}>Amazon Pay on Merchants</p>
      </div>

      <div className="footer-details2">
        <h3>Let Us Help You</h3>
        <p className={styles.hoverFunctionality}>COVID-19 and Amazon</p>
        <p className={styles.hoverFunctionality}>Your Account</p>
        <p className={styles.hoverFunctionality}>Returns Centre</p>
        <p className={styles.hoverFunctionality}>100% Purchase Protection</p>
        <p className={styles.hoverFunctionality}>Amazon App Download</p>
        <p className={styles.hoverFunctionality}>Help</p>
      </div>
    </div>
    <div className='last-details'>
    <p> &nbsp; &nbsp;&nbsp; Conditions of Use & Sale         &nbsp; &nbsp;&nbsp;         &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, Amazon.com, Inc. or its affiliates</p>
    </div>
    </div>
  )
}

export default Footer
