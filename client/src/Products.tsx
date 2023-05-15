import React from 'react';
import { useState } from 'react';
import type { User } from './types';
import { useEffect } from 'react';
import ffetch from './ffetch';

import './App.css';
const TESLA = 'xcabcz';

const Products = (props: {user: User, cart: (cart: Record<string, unknown>) => void}) => {
  const { cart } = props;
  const [products, setProducts] = useState<any[]>();

  const prodRequest = async () => {
    try {
      const res: Record<string, any> = await ffetch('/products');
      setProducts(res.response.data.filter((p: {sku: string}) => p.sku === TESLA));
      console.log(res.response.data)
    } catch (error) {
      console.log("Products req is Failed");
    }
  };

  const buyRequest = async () => {
    try {
      const res: any = await ffetch(
        '/buy',
        {
          method: 'POST',
          body: {
            items: products?.map(prod => ({
              quantity: 1,
              product_id: prod.id,
              list_price: prod.calculated_price,
              name: prod.name,
            }))
          }
        }
      );

      cart(res);
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
      {products && <button onClick={buyRequest}>
        Buy Now
      </button>}
    </div>
  );
};
export default Products;
