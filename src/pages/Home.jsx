import React from 'react'
import Footer from '../components/estaticos/Footer'


const Home = ({ cart ,productos, cargando, agregarCarrito, borrarProducto }) => {
  return (
    <>
      
      <main className='fondo' style={{display: 'flex',  flexDirection: 'column',  minHeight: '50%', flex: '1'}}>
        <div style={{ display: 'flex',  flexDirection: 'column', alignItems: 'center',flex: '1' }}>
          
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: '30px', padding: '30px'}}>
              <img
                src="http://gara.ddns.net/img2/iconos/Time%20to%20travel.png"
                alt="Logo de la compañía"
                style={{ height: '80px' }}
              />
              <h1 className='home'>Time to travel</h1>
            </div>
          
          <h3 className='home'>Embárcate en una aventura inolvidable</h3>
          <p className='home'>Disfruta de tus viajes sin importar cual sea el destino elegido...</p>
          <p className='home'>Nosotros lo hacemos realidad.</p>
          </div>
        
        <Footer style={{}}></Footer>
      </main>



    </>
  )
}

export default Home
