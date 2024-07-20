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
  // const {account, setAccount}= useContext(Logincontext)
  const navigate= useNavigate();

  function navi(){
    navigate('/signin');
}
function navi2(){
  navigate('/cart');
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
     <ShoppingBasketIcon onClick={navi2}/>
      </div>

    <Newnav/>

    </div>
  )
}

export default Header
