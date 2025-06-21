import React from 'react';
import Footer from '../components/estaticos/Footer';

const AcercaDe = () => {
  return (
    <>
      <main className='fondo01 home' style={{ display: 'flex', flexDirection: 'column', minHeight: '50%', flex: '1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
          <h1>Sobre mí</h1>

          <p>Soy Marcelo Augusto Garassino, DNI 23.974.934, comisión 25022, email <a href="mailto:marauggar@gmail.com?subject=Curso de ReactJS&body=Hola, ">marauggar@gmail.com</a></p>
          <p>
            La API de la que levanta datos esta página es accesible desde{' '}
            <a href="http://gara.ddns.net:21818/reactjs" target="_blank" rel="noopener noreferrer">
              AQUI
            </a>. En esa página se encuentran las instrucciones sobre usuario y contraseña reconocidas,
          </p>
          <p>
            también los datos de cómo funciona la API en .NET y cómo probarla desde el SWAGGER que le dejé integrado.
          </p>
          <p>
            Tanto la API como este front se encuentran alojados en el servidor de mi casa, por lo que el funcionamiento
            está sujeto al cumplimiento del servicio por parte de EDESUR y CABLEVISIÓN/FLOW/FIBERTEL.
          </p>
          <br />
          <a href="https://www.linkedin.com/in/marcelo-garassino-5194a2285/" target="_blank" rel="noopener noreferrer">
            Acceso a mi LinkedIn
          </a>
          <br /><br /><br />
          <a href="https://marcelogarassino.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
            Acceso a mi página web
          </a>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AcercaDe;

