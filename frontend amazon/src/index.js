import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./redux/app/store"
import Contextprovider from "./Components/context/Contextprovider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <Provider store={store}>
      <Contextprovider>

        <App />
        </Contextprovider>

      </Provider>

  </React.StrictMode>

);


reportWebVitals();

