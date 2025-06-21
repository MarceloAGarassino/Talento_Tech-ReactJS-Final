// Los numbres de usuario y contraseña reconocidas son:
// usario: admin    contraseña: AdMiN     perfil: administrador
// usuario: [cualquier nombre]    contraseña: 123     perfil: usuario   (usario comun)
// otras combinaciones de usuario y contraseña no son reconocidas, por lo tanto son no registradas



import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/estaticos/Footer';
import { AppContext } from '../context/AppContext'; 
const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { setPerfil } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://gara.ddns.net:21818/reactjs/Login?Nombre=${nombre}&Contrasena=${contrasena}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.perfil === 'Administrador' || data.perfil === 'Usuario') {
        setPerfil(data.perfil);
        navigate('/productos');
      } else {
        alert('Usuario o contraseña equivocados');
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      console.error(error);
    }
  };

  return (
    <>
      <main className='fondo02' style={{ display: 'flex', flexDirection: 'column', minHeight: '50%', flex: '1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
          <form onSubmit={handleLogin} className="log">
            <h2>Iniciar sesión</h2>
            <input
              className="log"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Usuario"
              required
            />
            <input
              className="log"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button className="log" type="submit">Ingresar</button>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Login;

