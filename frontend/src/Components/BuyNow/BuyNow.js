import React, { useState, useEffect, useContext } from 'react'
import Options from './Options'
import Subtotal from './Subtotal'
import { Logincontext } from '../../Components/context/Contextprovider';
import styles from './buynow.module.scss'

function BuyNow() {
  const [totalCost, setTotalCost] = useState(0);
  const [cartData, setCartData] = useState([]);
  const { account, setAccount } = useContext(Logincontext)
  const baseURL = 'http://localhost:8005'

  const groupCartItems = (items) => {
    const groupedItems = {};
    let sumOfPrice = 0;
    items.forEach((item) => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].quantity += 1; 
      } else {
        groupedItems[item.id] = { ...item, quantity: 1 };
      }
      sumOfPrice += item.price.mrp;
    });
    setTotalCost(sumOfPrice)
    return Object.values(groupedItems); 
  };


  const getdatabuy = async () => {
    const res = await fetch(`${baseURL}/cartdetails`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    })
    const data = await res.json();
    if (res.status !== 201) {
      alert("no data available on buynow page")
    }
    else {
      console.log(data.carts);
      const groupedData = groupCartItems(data.carts);
      setCartData(groupedData);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/remove/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      console.log(res.status);
      const data = await res.json();
      console.log(data);

      setAccount(data);
      getdatabuy();
      console.log("item removed from cart");

    }
    catch (error) {
      console.log("catch error in buynow page ",error);
    }
  };



  useEffect(() => {
    getdatabuy();
  }, []);

  const newLocal = <Options />;

  if (!cartData)
    return (<div>Loading...</div>)

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
                    <p>Cost: {e.price.mrp}</p>
                    <span>Quantity: {e.quantity}</span>  {/* Display quantity */}

                  </div>
                </div>
                <button className={styles.removeButton} onClick={() => { handleRemove(e.id) }}>Remove</button>
              </div>
            ))) :
            <p></p>
        }
        <h3>Cart Total: {totalCost}</h3>
      </div>
    </div>
  );

}

export default BuyNow
