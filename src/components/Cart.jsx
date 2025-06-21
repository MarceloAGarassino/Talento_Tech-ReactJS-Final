import React, { useContext } from 'react';
import './styleCart.css';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const Cart = ({ isOpen, onClose }) => {
  const {
    cart,
    handleDeleteFromCart,
    productos,
    setProductos,
    setCart,
  } = useContext(AppContext);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      // Copia local para ir actualizando cantidades
      const updatedProductos = [...productos];

      // Procesamos cada ítem del carrito en paralelo
      await Promise.all(
        cart.map(async (item) => {
          const index = updatedProductos.findIndex((p) => p.id === item.id);
          if (index === -1) return;                                         // No debería ocurrir, pero por si acaso

          const productoActual = updatedProductos[index];
          const nuevoStock =
            productoActual.disponibles - item.quantity;

          // Validación de stock
          if (nuevoStock < 0) {
            await Swal.fire({
              icon: 'warning',
              title: 'Stock insuficiente',
              text: `No hay suficientes plazas para ${productoActual.destinoN}`,
            });
            throw new Error('Stock insuficiente');
          }

          // Llamada PUT para actualizar el registro existente
          const response = await fetch(
            `http://gara.ddns.net:21818/reactjs/Destino/${item.id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...productoActual,
                disponibles: nuevoStock,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Error ${response.status} al actualizar el producto ${item.id}`
            );
          }

          // Actualizamos la copia local tras un PUT exitoso
          updatedProductos[index].disponibles = nuevoStock;
        })
      );

      // Vaciar carrito y refrescar lista de productos en contexto
      setCart([]);
      setProductos(updatedProductos);

      await Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        text: 'Tu reserva fue procesada correctamente.',
      });

      onClose();
    } catch (error) {
      // “Stock insuficiente” ya mostró alerta; sólo mostramos error genérico si es otro fallo
      if (error.message !== 'Stock insuficiente') {
        console.error('Error al finalizar la compra:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al procesar tu compra.',
        });
      }
    }
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2 style={{ color: '#2c3e50' }}>🧳 Destinos seleccionados</h2>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
              flexDirection: 'column',
            }}
          >
            <i
              className="fa-solid fa-suitcase-rolling"
              style={{ fontSize: '40px', color: '#ccc' }}
            ></i>
            <p
              style={{
                color: 'gray',
                fontSize: '18px',
                marginTop: '10px',
              }}
            >
              No hay destinos seleccionados
            </p>
          </div>
        ) : (
          <>
            <ul className="cart-item">
              {cart.map((item) => (
                <li key={item.id} className="cart-line">
                  <span>
                    <strong>{item.destinoN}</strong> <br />
                    u$s {item.precio} x {item.quantity} pax
                  </span>
                  <button
                    onClick={() => handleDeleteFromCart(item)}
                    className="delete-button"
                    title="Eliminar"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <span>Total:</span>
              <strong>u$s {total.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleCheckout} className="btn-finalizar">
                <i
                  className="fa-solid fa-credit-card"
                  style={{ marginRight: '8px' }}
                ></i>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
