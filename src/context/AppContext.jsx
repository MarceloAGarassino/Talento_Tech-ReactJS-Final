
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    fetch('http://gara.ddns.net:21818/reactjs/Destino/ObtenerDestinos')
      .then(res => res.json())
      .then(datos => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 2000);
      })
      .catch(error => {
        console.log('Error', error);
        setCargando(false);
        setError(true);
      });
  }, []);

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
  
    if (productInCart) {
      const nuevaCantidad = productInCart.quantity + product.quantity;
      if (nuevaCantidad > product.disponibles) {
        alert(`No puedes agregar más de ${product.disponibles} plazas a destino.`);
        return;
      }
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: nuevaCantidad }
          : item
      ));
    } else {
      if (product.quantity > product.disponibles) {
        alert(`Solo hay ${product.disponibles} plazas disponibles en este destino.`);
        return;
      }
      setCart([...cart, { ...product }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return item;
        }
      }).filter(item => item !== null);
    });
  };

  return (
    <AppContext.Provider value={{
      cart,
      setCart,
      productos,
      setProductos,
      cargando,
      error,
      perfil,
      setPerfil,
      handleAddToCart,
      handleDeleteFromCart
    }}>
      {children}
    </AppContext.Provider>
  );
};
