import React from 'react'
import Options from './Options'
import Subtotal from './Subtotal'

function BuyNow() {
  return (
    <div className='buynow-section'>
      <div className='left-buy'>
        <h1>Shopping cart</h1>
        <p>Select all items</p>
        <span className='left-buy-price'>Price</span>
      </div>

      <div className='item-container'>
        
      </div>
      <Options/>
      <Subtotal/>
    </div>
  )
}

export default BuyNow
