import React from 'react'
import styles from './Newnav.module.scss'

function Newnav() {
  return (
    <div className='new-nav'>
        <div className={styles.navdata}>
            <div className={styles.leftdata}>
                <p>All</p>
                <p>Mobile</p>
                <p>Groccery</p>
                <p>Fashion</p>
                <p>Prime</p>
                <p>Amazon Pay</p>
                <p>Electronics</p>
                </div>
        
        <div className={styles.rightdata}>
        <img src="https://m.media-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/Phase3/P3_SWM_400x39._CB575169081_.jpg" alt=""/>
        </div>
        </div>
   </div>
  )
}

export default Newnav
