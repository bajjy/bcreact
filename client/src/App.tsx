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

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <div className="App">
      {!user && <LoginForm
        setUser={(u) => setUserInfo(u)}
      />}
      
      {user && <Products
        user={user}
      />}
      
    </div>
  );
}

export default App;
