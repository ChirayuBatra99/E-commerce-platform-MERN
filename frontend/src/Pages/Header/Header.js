import { React, useContext } from 'react';
import Logo from '../../Pics/Header-Logo.png';
import styles from './Header.module.scss';
import { Button } from '@material-ui/core'; // importing material ui component
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import Newnav from '../Newnav/Newnav';
import { useNavigate } from 'react-router-dom';
import { Logincontext } from '../../Components/context/Contextprovider';
const baseURL = 'http://localhost:8005'

function Header() {
  const { account, setAccount } = useContext(Logincontext);
  const navigate = useNavigate();

  function navi() {
    navigate('/signin');
  }

  function navi2() {
    if (account) navigate('/buynow');
    else navigate('/signin');
  }

  const logoutFun = async () => {
    try {
      const res = await fetch(`${baseURL}/logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      if (res.status !== 201) {
        console.log('Error occurred in logging out.');
      } else {
        setAccount(false);
        console.log('Successfully logged out.');
        navigate('/signin');

      }
    } catch (error) {
      console.log('Error in logging out');
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <img className={styles.logo} onClick={() => navigate('/')} src={Logo} alt="Logo" />

        <div className={styles.searchWrapper}>
          <input className={styles.searchBar} placeholder="Search"></input>
          <SearchIcon className={styles.searchIcon} />
        </div>

        <div className={styles.options}>
        <Button className={styles.button} onClick={navi2}>
            Cart <ShoppingBasketIcon />
          </Button>
          {/* <Button className={styles.button} onClick={navi}>Hello, Sign In</Button> */}
          <Button className={styles.button}>Return and Orders</Button>
          <Button className={styles.button}>{account ? account.fname[0] : <p>User</p>}</Button>
          <Button className={styles.button} onClick={() => logoutFun()}>Logout</Button>

          {account && (
            <Button className={styles.button} onClick={() => logoutFun()}>
              Logout
            </Button>
          )}
        </div>
      </div>

      <Newnav />
    </div>
  );
}

export default Header;
