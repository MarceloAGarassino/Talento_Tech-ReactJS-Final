import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../Cart';
import { AppContext } from '../../context/AppContext';

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, handleDeleteFromCart, perfil, setPerfil } = useContext(AppContext);

  const handleLogout = () => {
    if (cart.length > 0) {
      const confirmar = window.confirm("El carrito está lleno y se perderán las reservas. ¿Deseas continuar y vaciar el carro?");
      if (!confirmar) return;
      cart.forEach(item => handleDeleteFromCart(item));
    }
    setPerfil(null);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm position-relative">
        <div className="container-fluid d-flex justify-content-between align-items-center">

          {/* IZQUIERDA: Logo */}
          <Link className="navbar-brand nav-link" to="/">Time to travel</Link>

          {/* CENTRO: Links navegables centrados con posición absoluta */}
          <ul className="navbar-nav position-absolute start-50 translate-middle-x nav-central">
            <li className="nav-item">
              <Link to="/productos" className="nav-link">Destinos</Link>
            </li>
            <li className="nav-item">
              <Link to="/acercade" className="nav-link">Sobre mí</Link>
            </li>
          </ul>

          {/* DERECHA: Perfil y carrito */}
          <div className="d-flex align-items-center">
            {(perfil === 'Administrador' || perfil === 'Usuario') ? (
              <>
                <span className="text-white me-2">{perfil}&nbsp;&nbsp;</span>
                <button
                  onClick={handleLogout}
                  className=" btn-sm me-2 nav-link"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/Log" className="nav-link text-white">Iniciar sesión</Link>
            )}

            <button
              className="btn btn-outline-primary ms-2 position-relative"
              onClick={() => setCartOpen(true)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* CARRITO LATERAL */}
        <Cart
          borrarProducto={handleDeleteFromCart}
          cartItems={cart}
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
        />
      </nav>
    </header>
  );
};

export default Header;









// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './styleEstatico.css';
// import Cart from '../Cart';
// import { AppContext } from '../../context/AppContext';

// const Header = () => {
//   const [isCartOpen, setCartOpen] = useState(false);
//   const navigate = useNavigate();
//   const { cart, handleDeleteFromCart, perfil, setPerfil } = useContext(AppContext);

//   const handleLogout = () => {
//     if (cart.length > 0) {
//       const confirmar = window.confirm("El carrito está lleno y se perderán las reservas. ¿Deseas continuar y vaciar el carro?");
//       if (!confirmar) return;

//       cart.forEach(item => handleDeleteFromCart(item));
//     }

//     setPerfil(null);
    
//   };

//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
//         <div className="container-fluid">

//           {/* Marca izquierda */}
//           <Link className="navbar-brand nav-link" to="/">Time to travel</Link>

//           {/* Botón hamburguesa para móviles */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarContent"
//             aria-controls="navbarContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>

//           {/* Menú central + área derecha */}
//           <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          
//             {/* CENTRO: Links de navegación */}
//             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            
//               <li className="nav-item">
//                 <Link to="/productos" className="nav-link">Destinos</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/acercade" className="nav-link">Sobre mí</Link>
//               </li>
//             </ul>

//             {/* DERECHA: Perfil y carrito */}
//             <div className="d-flex align-items-center">
//               {(perfil === 'Administrador' || perfil === 'Usuario') ? (
//                 <>
//                   <span>{perfil}&nbsp;&nbsp;</span>
//                   <button
//                     onClick={handleLogout}
//                     className="btn-sm ms-2 nav-link"
//                   >                                                           
//                     Cerrar sesión
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/Log" className="nav-link">Iniciar sesión</Link>
//               )}

//               <button
//                 className="btn btn-outline-primary ms-3 position-relative"
//                 onClick={() => setCartOpen(true)}
//               >
//                 <i className="fa-solid fa-cart-shopping"></i>
//                 {cart.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cart.length}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Carrito lateral */}
//         <Cart
//           borrarProducto={handleDeleteFromCart}
//           cartItems={cart}
//           isOpen={isCartOpen}
//           onClose={() => setCartOpen(false)}
//         />
//       </nav>
//     </header>
//   );
// };

// export default Header;



