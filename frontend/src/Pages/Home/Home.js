import React from 'react'
import pic from '../../Pics/amazon home.png'
import styles from './Home.module.scss'
import Products from '../Products/Products'
import Banner from './Banner'
import Slide from '../Slide/Slide'
import { products } from '../Slide/productdata'
import Footer from './Footer'

import { useDispatch, useSelector } from 'react-redux'

function Home() {
  return (
    <div>
      {/* yo */}
      {/* <img className={styles.pic} src={pic} alt="PIX" /> */}
     <div>
      <Banner/>
      <Slide products={products}/>
      {/* <Products/>
      <Products/> */}
      <Slide/>
      <Footer/>
      </div>
     </div>
  )
}

export default Home
