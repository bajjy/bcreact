import React from 'react';
import { useState, useEffect } from "react";
import LoginForm from './Login';
import Products from './Products';
import type { User } from './types';

import './App.css';

function App() {
  const [user, setUser] = useState<User | null>();
  const setUserInfo = (userInfo: User | null) => {
    !userInfo && setUser(null);
    console.log(userInfo)
    setUser(userInfo);
    userInfo && localStorage.setItem('x-access-token', userInfo.token)
  }
  const [cart, setCart] = useState<any | null>();
  const setCartInfo = (cartInfo:  any | null) => {
    !cartInfo && setUser(null);
    setCart(cartInfo);
  }

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <div className="App">
      {!user && <LoginForm
        setUser={(u) => setUserInfo(u)}
      />}
      
      {!cart && user && <Products
        cart={setCartInfo}
        user={user}
      />}
      
      {cart && <div className="cart">
        {cart && cart.response.data.line_items.physical_items.map((prod: any) => {
          return <div className="prod-cart" key={prod.sku}>
            <img src={prod.image_url} alt={prod.name} />
            {prod.name}
            price: {prod.original_price}
          </div>
        })}
      </div>

      }
    </div>
  );
}

export default App;
