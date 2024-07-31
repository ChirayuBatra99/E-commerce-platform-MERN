import {React, useContext } from 'react'
import Logo from '../../Pics/Amazon-Logo.png'
import styles from './Header.module.scss'
import {Button} from '@material-ui/core'; //importing material ui component
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import Newnav from '../Newnav/Newnav';
import { useNavigate } from 'react-router-dom';
import { Logincontext } from '../../Components/context/Contextprovider';

function Header() {
  const {account, setAccount}= useContext(Logincontext)
  const navigate= useNavigate();

  function navi(){
    
    navigate('/signin');
}
function navi2(){
  if(account)
    navigate('/buynow');
  else  
    navigate('/signin')
}

const getDetailsValidUser = async()=>{
  
}

const logoutFun= async()=>{
  try{
      const res= await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
          credentials: "include"
      })
      const data= await res.json();
      if(res.status !==201)
      {
        console.log("error occured in logging out bro");
        // throw error;
      }
      else{
          setAccount(false);
          console.log("successfully logged out");
      }
  }
  catch(error){
    console.log("error in logging out");
  }
}

  return(
    <div>
      <div className={styles.container}>
      <img  className={styles.logo} onClick={()=>navigate("/")} src={Logo} alt="Logo" />
     <input className={styles.searchBar} placeholder='search'></input>
     <SearchIcon/>
     {/* <div> */}
     <Button onClick={navi}>Hello, sign in</Button>
     <Button>Return and orders</Button>

     <Button><h3>{account?account.fname[0]:<p>User </p>}</h3></Button>
     <Button onClick={navi2}>Cart <ShoppingBasketIcon /></Button>
     <Button><h3 onClick={()=>logoutFun()}>Logout</h3></Button>
      </div>

    <Newnav/>

    </div>
  )
}

export default Header
