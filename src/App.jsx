
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import Log from './pages/Log'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import NotFound from './pages/NotFound'
import Header from './components/estaticos/Header'
import DetalleProducto from './components/DetalleProducto' 
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/acercade' element={<AcercaDe />} />
          <Route path='/productos' element={<GaleriaDeProductos />} />
          <Route path='/producto/:id' element={<DetalleProducto />} /> 
          <Route path='/Log' element={<Log />} />
          <Route path='/talento-tech-ReactJS/dist/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
