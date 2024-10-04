import React, { useState, useEffect, useContext } from 'react'
import Options from './Options'
import Subtotal from './Subtotal'
import { Logincontext } from '../../Components/context/Contextprovider';
import styles from './buynow.module.scss'
import { ToastContainer, toast } from 'react-toastify';
// import dotenv from 'dotenv'
// dotenv.config()


function BuyNow() {
  const [totalCost, setTotalCost] = useState(0);
  const [cartData, setCartData] = useState([]);
  const { account, setAccount } = useContext(Logincontext)
  const baseURL = 'http://localhost:8005'

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Fetch cart data when component mounts
    getdatabuy();

    return () => {
      document.body.removeChild(script); // Clean up the script on unmount
    };
  }, []);
  
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

  const handleAddOne = async (id) => {
    try {
      const res = await fetch(`${baseURL}/addone/${id}`, {
        method: "POST",
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
      console.log("item added to cart");
    }
    catch (error) {
      console.log("catch error in buynow page ",error);
    }
  };

  const handlePayment = async () => {
    const amount = totalCost;
    try {
      // console.log("hi");
        const res = await fetch(`${baseURL}/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        });
        const data = await res.json();
        console.log("hi");
        console.log(process.env.RAZORPAY_KEY_ID);
        handlePaymentVerify(data.data)

        console.log("data", data);
    } catch (error) {
        console.log(error);
    }
}

const handlePaymentVerify = async (data) => {
  const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Chirayu",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
          console.log("response", response)
          try {
              const res = await fetch(`${baseURL}/verify`, {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json'
                  },
                  body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                  })
              })

              const verifyData = await res.json();

              if (verifyData.message) {
                  toast.success(verifyData.message)
              }
          } catch (error) {
              console.log(error);
          }
      },
      theme: {
          color: "#5f63b8"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}


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
                    <span>Quantity: {e.quantity}</span> 
                  </div>
                </div>
                <div>
                <button className={styles.addButton} onClick={() => { handleAddOne(e.id) }}>+</button>
                <button className={styles.removeButton} onClick={() => { handleRemove(e.id) }}>-</button>
                </div>
              </div>
            ))) :
            <p></p>
        }
        <div className={styles.checkoutContainer}>
            <h3>Cart Total: {totalCost}</h3>
            <button className={styles.checkoutButton} onClick={() => { handlePayment() }}>Checkout Cart</button>
        </div>
      </div>
    </div>
  );

}

export default BuyNow
