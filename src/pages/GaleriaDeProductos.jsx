import React, { useContext, useState } from 'react';
import Productos from '../components/Productos';
import { AppContext } from '../context/AppContext';
import FormularioProducto from '../components/Formulario';
import Footer from '../components/estaticos/Footer';
import Swal from 'sweetalert2';

const ProductList = () => {
  const { productos, perfil, setProductos } = useContext(AppContext);
  const [modo, setModo] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;                               //cantidad de productos a mostrar por pagina
  const [busqueda, setBusqueda] = useState('');

  // Calcular productos a mostrar según la página
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;

  const productosFiltrados = busqueda.length >= 1             //cantidad minima de letras para iniciar la busqueda
  ? productos.filter(p =>
      p.destinoN.toLowerCase().includes(busqueda.toLowerCase())
    )
  : productos;                                                //Busqueda de productos

  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
  a.destinoN.localeCompare(b.destinoN));

  // const productosOrdenados = [...productos].sort((a, b) =>
  // a.destinoN.localeCompare(b.destinoN));                      //Ordena alfabeticamente los productos 

  // const productosPaginados = productos.slice(indiceInicio, indiceFin);
  const productosPaginados = productosOrdenados.slice(indiceInicio, indiceFin);

  //const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const handleAgregar = () => {
    setModo('nuevo');
    setProductoSeleccionado(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (producto) => {
    setModo('editar');
    setProductoSeleccionado(producto);
    setMostrarFormulario(true);
  };


  const handleEliminar = async (producto) => {
    const resultado = await Swal.fire({
      title: `¿Eliminar el destino "${producto.destinoN}"?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (resultado.isConfirmed) {
      try {
        await fetch(`http://gara.ddns.net:21818/reactjs/Destino/${producto.id}`, {
          method: 'DELETE'
        });
        setProductos(prev => prev.filter(p => p.id !== producto.id));
  
        Swal.fire({
          title: 'Eliminado',
          text: 'El destino fue eliminado correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar el destino',
          icon: 'error'
        });
        console.error(error);
      }
    }
  };


  const handlePaginaClick = (numero) => {
    setPaginaActual(numero);
  };

  return (
    <>

      <div className="product-list-container">
        <div style={{ textAlign: 'center' }}>
          <img
            src="http://gara.ddns.net/img2/iconos/Time%20to%20travel.png"
            alt="Logo de la compañía"
            style={{ height: '80px' }}
          />
        </div>
        <h3 className='destinos home'>En los siguientes destinos quedan aún plazas disponibles</h3>

        <div className='admin-button-center'>
          {perfil === 'Administrador' && (
            <button onClick={handleAgregar} className="admin-button">Agregar Producto</button>
          )}
        </div>

        <div className="busqueda-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar destino..."
            value={busqueda}
            onChange={(e) => {
              setPaginaActual(1);                            // Reinicia a la primera página al cambiar búsqueda
              setBusqueda(e.target.value);
            }}
            style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', width: '250px' }}
          />
        </div>

        <div className="product-grid">
          {productosPaginados.map(producto => (
            <div key={producto.id} style={{ position: 'relative' }}>
              <Productos producto={producto} />
              {perfil === 'Administrador' && (
                <div>
                  <button className='editar-btn' onClick={() => handleEditar(producto)}>Editar</button>
                  
                  <button className='borrar-btn' onClick={() => handleEliminar(producto)}>Borrar</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button
            onClick={() => handlePaginaClick(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>

          {[...Array(totalPaginas)].map((_, index) => {
            const numero = index + 1;
            return (
              <button
                key={numero}
                onClick={() => handlePaginaClick(numero)}
                className={paginaActual === numero ? 'active' : ''}
              >
                {numero}
              </button>
            );
          })}

          <button
            onClick={() => handlePaginaClick(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>

        {mostrarFormulario && (
          <FormularioProducto
            modo={modo}
            producto={productoSeleccionado}
            onClose={() => setMostrarFormulario(false)}
          />
        )}
        <br/>
        <Footer />
      </div>
    </>
  );
};

export default ProductList;

