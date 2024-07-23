import React, {useState, useEffect} from 'react'
import Options from './Options'
import Subtotal from './Subtotal'

function BuyNow() {

  const [cartData, setCartData]= useState("");

  const getdatabuy = async()=>{
    const res= await fetch("/cartdetails",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type":  "application/json"
      },
      credentials: "include"
    })
    const data= await res.json();
    if(res.status!==201)
    {
      alert("no data available on buynow page")
    }
    else
    {
      setCartData(data.carts);
    }
  };

  useEffect(()=>{
    getdatabuy();
  },[]);

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
