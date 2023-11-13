import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from './Pages/Header/Header.js'
// import LockIcon from '@material-ui/icons/Lock';
import Home from './Pages/Home/Home.js'
import SignIn from './Pages/SignUpIn/SignIn.js';

function App() {
  return (
    <div className="App">
      
     
        <BrowserRouter>
        <Routes>
          <Route path="" element={<div><Header/> <Home/></div> } />
      <Route path="/signin" element={<SignIn/>} />

         </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
