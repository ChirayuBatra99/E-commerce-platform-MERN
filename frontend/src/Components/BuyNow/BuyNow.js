import React, { useState, useEffect, useContext } from 'react'
import Options from './Options'
import Subtotal from './Subtotal'
import { Logincontext } from '../../Components/context/Contextprovider';
import styles from './buynow.module.scss'

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
    getdatabuy();
    console.log("item removed from cart");
  }
  catch(error)
  {
    console.log("catch error in buynow page ");
  }
  };

 

  useEffect(() => {
    getdatabuy();
  }, []);

  const newLocal = <Options />;

  if(!cartData)
    return(<div>Loading...</div>)
  // return (
  //   <div className={styles.container}>
  //     <div className='left-buy'>
  //       <h1>Shopping cart</h1>
  //       <p>Select all items</p>
  //       <span className='left-buy-price'>Price</span>
  //       <p>--------------</p>
  //       {
  //         cartData.length>0 ?
  //           (cartData.map((e, index) => (
  //             <div style={{display: "flex", flexDirection:"row"}}>
  //               <div style={{display: "flex"}}>
  //                 <img src={e.url} alt="image not there"/>
  //                 <div>
  //                   {e.title.longTitle} <br/>
  //                   {e.title.shortTitle} 
  //                 </div>
  //               </div>
  //               <button onClick={()=>{handleRemove(e.id)}}>Remove</button>
  //             </div>
  //           ))) :
  //           <p>Hii</p>
  //       }

  //     </div>

  //     <div className='item-container'>

  //     </div>
    
  //   </div>
  // )
  
  return (
    <div className={styles.container}>
      <div className={styles.leftBuy}>
        <h1>Shopping cart</h1>
        <p>Select all items</p>
        <span className={styles.leftBuyPrice}>Price</span>
        <p className={styles.separator}>--------------</p>
        {
          cartData.length > 0 ?
            (cartData.map((e, index) => (
              <div className={styles.cartItem} key={index}>
                <div className={styles.cartItemDetails}>
                  <img src={e.url} alt="image not there" className={styles.cartItemImage} />
                  <div className={styles.cartItemText}>
                    <span>{e.title.longTitle}</span> <br />
                    <span>{e.title.shortTitle}</span>
                  </div>
                </div>
                <button className={styles.removeButton} onClick={() => { handleRemove(e.id) }}>Remove</button>
              </div>
            ))) :
            <p></p>
        }
      </div>
    </div>
  );

}

export default BuyNow
