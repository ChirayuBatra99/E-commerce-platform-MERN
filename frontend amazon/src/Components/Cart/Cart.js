import React, { useState, useEffect, useContext } from 'react'
import { addToCart, removeSingleIteams, removeToCart, emptycartIteam } from '../../redux/features/cartSlice'
import styles from './Cart.module.scss'
import {  useParams } from 'react-router';
// import {useHistory} from "react-router-dom";
import { Logincontext} from "../context/Contextprovider"
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

    // const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    // const { carts } = useSelector((state) => state.allCart);
    const {id}= useParams("");
    const [indData, setIndData]= useState("");
    const baseURL= 'http://localhost:8005'
    const {account, setAccount}= useContext(Logincontext);
     //this line causing error
    // const history= useHistory();

    const getIndData = async()=>{

        const res= await fetch(`${baseURL}/getproductsone/${id}`,{

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
            console.log("getinddata",data)
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
        const check= await fetch(`/addcart/${id}`,{
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
        const data1 = await check.json();
        console.log("data from cart page", data1);
        if(check.status !== 201)
        {
            alert("no data available");
        }
        else
        {
            setAccount(data1);
            // history.pushState("/buynow")
        }
   }

    return (
        <div>
            <div className={styles.cartContainer}>
                
                {/* {console.log("cart=", carts)} */}
            </div>
            <div>
                <h3>{indData.id}</h3>

                {indData._id}<br/>
                <button onClick={()=> addToCart(indData._id)}>Add to cart</button>
            </div>
           
            
        </div>
    )
}

export default Cart



