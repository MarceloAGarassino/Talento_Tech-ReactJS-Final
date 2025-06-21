import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './styleProductos.css';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const Productos = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const { handleAddToCart, perfil } = useContext(AppContext);

  const increase = () => setCantidad(prev => (prev < producto.disponibles ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = () => {
    if (perfil !== 'Administrador' && perfil !== 'Usuario') {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'Debes iniciar sesión para poder agregar al carrito.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    handleAddToCart({ ...producto, quantity: cantidad });
    
    Swal.fire({
      icon: 'success',
      title: 'Agregado',
      text: `${producto.destinoN} fue agregado al carrito.`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
    <section className='card'>
      <div className='imganContainer'>
        <img src={producto.url} alt="" className='product-imagen' />
        <Link to={`/producto/${producto.id}`} className='verDesc-btn'>
          <button className='verDesc-btn'>Ver descripción</button>
        </Link>
      </div>

      <h3 className='nombre'>{producto.destinoN}</h3>
      <p className='precio'>u$s{producto.precio} por persona</p>
      <p className='disponibles'>{producto.disponibles} plazas disponibles</p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>

      <button
        onClick={agregarAlCarrito} className='admin-button'
        disabled={producto.disponibles === 0}
        style={{
          backgroundColor: producto.disponibles === 0 ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '5px',
          cursor: producto.disponibles === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        {producto.disponibles === 0 ? 'Sin plazas disponibles' : 'Agregar al carrito'}
      </button>

    </section>
  );
};

export default Productos;
