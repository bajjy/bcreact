import React from 'react';
import { useState } from 'react';
import type { User } from './types';
import { useEffect } from 'react';
import ffetch from './ffetch';

import './App.css';

const Products = (props: {user: User}) => {
  const [products, setProducts] = useState<any[]>();

  const prodRequest = async () => {
    try {
      const res: Record<string, any> = await ffetch('/products');
      setProducts(res.response.data);
      console.log(res.response.data)
    } catch (error) {
      console.log("Products req is Failed");
    }
  };

  useEffect(() => {
    prodRequest();
  }, []);

  return (
    <div className="App-header">
      <div className="prods">
        {products && products.map((prod, i) => {
          return <div className="prod">
            {prod.name}
          </div>
      })}
      </div>
    </div>
  );
};
export default Products;
