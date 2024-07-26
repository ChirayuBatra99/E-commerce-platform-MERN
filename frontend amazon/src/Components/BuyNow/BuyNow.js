import React, { useState, useEffect, useContext } from 'react'
import Options from './Options'
import Subtotal from './Subtotal'
import { Logincontext } from '../../Components/context/Contextprovider';

function BuyNow() {

  const [cartData, setCartData] = useState([]);
  const { account, setAccount } = useContext(Logincontext)
  const baseURL= 'http://localhost:8005'

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (res.status !== 201) {
      alert("no data available on buynow page")
    }
    else {
      console.log(data.carts);
      setCartData(data.carts);
    }
  };

  const handleRemove = async(id)=>{
    try{
    const res= await fetch(`/remove/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    console.log(res.status);
    const data= await res.json();
    console.log(data);

    setAccount(data);
    getDataBuy();
    console.log("item removed from cart");
  }
  catch(error)
  {
    console.log("catch error in buynow page ");
  }
  };

  const getDataBuy = async()=>{
    try{
        const res = await fetch("/cartdetails", {
            method: "GET",
            header: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }, 
            credentials: "include"
        })
        const data= await res.json();
        console.log(data);
        if(res.status !== 201)
            console.log("error occured in buynow page line 63");
        else
          setCartData(data.carts);
    }
    catch(error){
        console.log(error, "error in catch block of getbuydata");
    }
  }

  useEffect(() => {
    getdatabuy();
  }, []);

  const newLocal = <Options />;
  return (
    <div className='buynow-section'>
      <div className='left-buy'>
        <h1>Shopping cart</h1>
        <p>Select all items</p>
        <span className='left-buy-price'>Price</span>
        <p>--------------</p>
        {
          cartData.length>0 ?
            (cartData.map((e, index) => (
              <div style={{display: "flex", flexDirection:"row"}}>
                <p>
                  {e.id}
                </p>
                <button onClick={()=>{handleRemove(e.id)}}>Remove</button>
              </div>
            ))) :
            <p>Hii</p>
        }

      </div>

      <div className='item-container'>

      </div>
      {/* {newLocal} */}
      {/* <Subtotal/> */}
    </div>
  )
}

export default BuyNow
