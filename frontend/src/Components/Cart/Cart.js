import React, { useState, useEffect, useContext } from 'react'
import { addToCart, removeSingleIteams, removeToCart, emptycartIteam } from '../../redux/features/cartSlice'
import styles from './Cart.module.scss'
import {  useParams } from 'react-router';
// import {useHistory} from "react-router-dom";
import { Logincontext} from "../context/Contextprovider"
// import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

    const [price, setPrice] = useState(0);
    const {id, sectionId}= useParams("");
    
    const [indData, setIndData]= useState("");
    const baseURL= 'http://localhost:8005'
    const {account, setAccount}= useContext(Logincontext);

    const getIndData = async()=>{
        console.log("hiii",id)
        const res= await fetch(`${baseURL}/getproductsone/${sectionId}/${id}`,{

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        if(res.status!==201)
        {
            console.log(res.fact)
            alert("No data available for this product");
        }
        else
        {
            const data = await res.json();
            console.log("getinddata11",data)
            setIndData(data);
        }
   };

   useEffect(()=>{
    setTimeout(getIndData,1000);
   },[id]);

   const addToCart= async(id)=>{
        console.log(id);
        console.log("account", account)
        console.log("acc ends");

        try{
        const check= await fetch(`${baseURL}/addcart/${sectionId}/${id}`,{
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                indData
            }),
            credentials: "include"
        });
        console.log("item added");
        

        const data1 = await check.json();
        console.log("data from cart page", data1);
        if(check.status !== 201)
        {
            alert("no data available");
        }
        else
        {
            setAccount(data1);
            toast("Item added successfully")
            // history.pushState("/buynow")
        }
    }
    catch(error)
    {
        console.log(error);
    }
    }
   if (!indData) {
    return <div>Loading...</div>; // or any loading spinner/component
}

    return (
        <div className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img src={indData.url}  alt={indData.title.longTitle} className={styles.productImage} />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.longTitle}>{indData.title.longTitle}</h2>
            <h3 className={styles.shortTitle}>({indData.title.shortTitle})</h3>
            <h4 className={styles.price}>₹ {indData.price.mrp}</h4>
            <div className={styles.buttonContainer}>
              <button className={styles.buyButton} onClick={() => addToCart(indData._id)}>Buy now</button>
              <button className={styles.cartButton} onClick={() => addToCart(indData._id)}>Add to cart</button>
            </div>

          </div>
          <ToastContainer/>

        </div>
      );


}

export default Cart



