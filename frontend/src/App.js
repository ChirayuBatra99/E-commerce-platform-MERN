import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from './Pages/Header/Header.js'
// import LockIcon from '@material-ui/icons/Lock';
import Home from './Pages/Home/Home.js'
import IndividualItem from './Components/IndividualItem/IndividualItem.js'
import SignIn from './Pages/SignUpIn/SignIn.js';
import SignUp from './Pages/SignUpIn/SignUp.js';
import Cart from './Components/Cart/Cart.js'
import BuyNow from './Components/BuyNow/BuyNow.js';
// import Header from './Pages/Header/Header.js'
function App() {


  return (
    <div className="App">
        <BrowserRouter>
        <Header/>

        <Routes>
          <Route path="/" element={<div> <SignUp/></div> } />
          <Route path="/home" element={<div> <Home/></div> } />

          <Route path="/signin" element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
          {/* <Route path="/cart" element={<Cart/>} /> */}
          <Route path="/buynow" element={<BuyNow/>} />
          <Route path="/getproductsone/:sectionId/:id" element={<Cart/>} />

         </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
