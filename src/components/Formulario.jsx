import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Swal from 'sweetalert2';

const FormularioProducto = ({ modo, producto, onClose }) => {
  const { setProductos } = useContext(AppContext);

  const [formData, setFormData] = useState(
    producto || { destinoN: '', precio: '', disponibles: '', url: '', descripcion: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'disponibles' ? parseInt(value) : value
    }));
  };

  const obtenerProductosActualizados = async () => {
    try {
      const res = await fetch('http://gara.ddns.net:21818/reactjs/Destino/ObtenerDestinos');
      if (!res.ok) throw new Error('Error al obtener destinos actualizados');
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      Swal.fire('Error', 'Error al actualizar la lista de destinos', 'error');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modo === 'nuevo') {
        const res = await fetch('http://gara.ddns.net:21818/reactjs/Destino/GrabarDestino', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error();

        await obtenerProductosActualizados();
        Swal.fire('Éxito', 'Destino agregado correctamente', 'success');
      } else {
        await fetch(`http://gara.ddns.net:21818/reactjs/Destino/${producto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: producto.id })
        });
        setProductos(prev =>
          prev.map(p => (p.id === producto.id ? { ...formData, id: producto.id } : p))
        );
        Swal.fire('Actualizado', 'Destino modificado correctamente', 'success');
      }
      onClose();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el destino', 'error');
      console.error(error);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          {modo === 'nuevo' ? 'Agregar nuevo destino' : 'Editar destino'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            name="destinoN"
            value={formData.destinoN}
            onChange={handleChange}
            placeholder="Destino"
            required
            style={inputStyle}
          />
          <input
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
            style={inputStyle}
          />
          <input
            name="disponibles"
            type="number"
            value={formData.disponibles}
            onChange={handleChange}
            placeholder="Plazas disponibles"
            required
            style={inputStyle}
          />
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="URL de imagen"
            required
            style={inputStyle}
          />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                flex: 1,
                marginRight: '10px'
              }}
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

export default FormularioProducto;
