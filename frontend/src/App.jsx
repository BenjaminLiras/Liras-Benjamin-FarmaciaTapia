import React from 'react';
import Layout from './components/Layout.jsx';
import Inicio from './pages/Inicio.jsx';
import Productos from './pages/Productos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import Carrito from './pages/Carrito.jsx';
import MisPedidos from './pages/MisPedidos.jsx';
import './styles/pedidos.css';

export default function App() {
  const ruta = window.location.pathname.replace(/\/$/, '') || '/';
  const paginas = { '/': Inicio, '/productos': Productos, '/nosotros': Nosotros, '/contacto': Contacto, '/carrito': Carrito, '/mis-pedidos': MisPedidos };
  const Pagina = paginas[ruta];
  return <Layout ruta={ruta}>{Pagina ? <Pagina /> : <section className="container seccion"><h1>Página no encontrada</h1><a href="/">Volver al inicio</a></section>}</Layout>;
}
