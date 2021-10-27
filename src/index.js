import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductContextProvider from './context/productContext/productContext';
import AuthContextProvider from './context/authContext/AuthContext';
import CategoryContextProvider from './context/categoryContext/categoryContext';
import OrderContextProvider from './context/orderContext/orderContext';
import UserContextProvider from './context/userContext/userContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <CategoryContextProvider>
          <OrderContextProvider>
            <UserContextProvider>

              <App />
              
            </UserContextProvider>
          </OrderContextProvider>
        </CategoryContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

