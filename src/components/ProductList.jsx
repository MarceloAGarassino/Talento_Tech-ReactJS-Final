import React, { useContext } from 'react';
import Productos from './Productos';
import { AppContext } from '../context/AppContext';

const ProductList = () => {
  const { productos } = useContext(AppContext);

  return (
    <>
      <h3 className='destinos home'>En los siguientes destinos quedan aun plazas disponibles</h3>
      <div className="product-grid">
        {productos.map(producto => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
