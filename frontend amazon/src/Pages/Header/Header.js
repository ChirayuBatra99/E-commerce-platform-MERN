import React from 'react'
import Logo from '../../Pics/Amazon-Logo.png'
import styles from './Header.module.scss'
import {Button} from '@material-ui/core'; //importing material ui component
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import Newnav from '../Newnav/Newnav';
import { useNavigate } from 'react-router-dom';




function Header() {
  const navigate= useNavigate();

  function navi(){
    navigate('/signin');
}

  return(
    <div>
      <div className={styles.container}>
      <img  className={styles.logo} src={Logo} alt="Logo" />
     <input placeholder='search'></input>
     <SearchIcon/>
     {/* <div> */}
     <Button onClick={navi}>Hello, sign in</Button>
     <Button>Return and orders</Button>
     <ShoppingBasketIcon/>
      </div>

    <Newnav/>

    </div>
  )
}

export default Header
