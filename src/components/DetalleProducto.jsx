import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './styleProductos.css'; 
import Footer from '../components/estaticos/Footer';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos } = useContext(AppContext);

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <>
      <main className='product-list-container' style={{ display: 'flex', flexDirection: 'column', minHeight: '130vh', flex: '1' }}>
        <div  className="detalle-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
          {/* <div className="product-list-container"> */}
            {/* <div> */}
              <h2>{producto.destinoN}</h2>
              <img src={producto.url} alt={producto.destinoN} className='detalle-img' />
              <p><strong>Precio:</strong> u$s{producto.precio}</p>
              <p><strong>Disponibles:</strong> {producto.disponibles}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>

              <button onClick={() => navigate('/Productos')}>Volver</button>
            {/* </div> */}
          {/* </div> */}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default DetalleProducto;
