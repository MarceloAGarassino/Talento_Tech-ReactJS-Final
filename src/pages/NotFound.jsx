import React from 'react'
import { Link } from 'react-router-dom'
import errcuatrocerocuatro from '../assets/404.jpg'


const NotFound = () => {
  return (
    <div className='notFound'>
      <h3>Ha ocurrido un error</h3>
      <img src={errcuatrocerocuatro} alt="Página no encontrada" style={{ maxWidth: '10%', height: 'auto' }} />
      <h3>Página no encontrada</h3>
      <button><Link to='/'>Volver al inicio</Link></button>
    </div>
  )
}

export default NotFound
