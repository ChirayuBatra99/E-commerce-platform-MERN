import React from 'react'
import {Button} from '@material-ui/core'; //importing material ui component
import styles from './Product.module.scss'
function Products() {
  return (
    <div >
        <div className={styles.product}>
            <div>
            <p>First product title</p>
            <p classname='product-info'>
                <small>$</small>
                <strong> 11.9</strong>
            </p>
        </div>
        
        <img src='https://m.media-amazon.com/images/I/31ySF462znL._MCnd_AC_.jpg' alt="nah"/>
        <Button>add to basket</Button>
        </div>

        <div className={styles.product}>
            <div>
            <p>First product title</p>
            <p classname='product-info'>
                <small>$</small>
                <strong> 11.9</strong>
            </p>
        </div>
        
        <img src='https://m.media-amazon.com/images/I/31ySF462znL._MCnd_AC_.jpg' alt="nah"/>
        <Button>add to basket</Button>
        </div>
    </div>
    
  )
}

export default Products
