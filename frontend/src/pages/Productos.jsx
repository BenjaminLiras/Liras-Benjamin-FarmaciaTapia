import React, { useEffect, useState } from 'react';
import Aviso from '../components/Aviso.jsx';
import Dialogo from '../components/Dialogo.jsx';
import ProductoForm from '../components/ProductoForm.jsx';
import TablaProductos from '../components/TablaProductos.jsx';
import Foto from '../components/Foto.jsx';
import { listarCategorias } from '../services/categorias.js';
import { crear, editar, eliminar, listar } from '../services/productos.js';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState(new URLSearchParams(window.location.search).get('categoria') || 'Todos');
  const [gestion, setGestion] = useState(false);
  const [estado, setEstado] = useState('cargando');
  const [aviso, setAviso] = useState(null);
  const [modal, setModal] = useState(null);
  const [ocupado, setOcupado] = useState(false);

  function informarError(error) {
    setAviso({ tipo: 'error', mensaje: error.message });
  }

  async function cargar() {
    setEstado('cargando');
    setAviso(null);
    try {
      const [lista, opciones] = await Promise.all([listar(), listarCategorias()]);
      setProductos(lista);
      setCategorias(opciones);
      setEstado('listo');
    } catch (error) {
      setEstado('error');
      informarError(error);
    }
  }

  useEffect(() => { cargar(); }, []);

  function abrir(tipo, producto) {
    setAviso(null);
    setModal({ tipo, producto });
  }

  function cerrar() {
    setAviso(null);
    setModal(null);
  }

  async function operar(accion, mensaje) {
    setOcupado(true);
    setAviso(null);
    try {
      await accion();
      setModal(null);
      setAviso({ tipo: 'exito', mensaje });
    } catch (error) {
      informarError(error);
    } finally {
      setOcupado(false);
    }
  }

  function guardar(datos) {
    if (modal.producto) {
      const { id } = modal.producto;
      operar(async () => {
        const actualizado = await editar(id, datos);
        setProductos(lista => lista.map(item => item.id === id ? actualizado : item));
      }, 'Producto actualizado.');
    } else {
      operar(async () => {
        const nuevo = await crear(datos);
        setProductos(lista => [...lista, nuevo]);
      }, 'Producto agregado.');
    }
  }

  function confirmar() {
    const { id } = modal.producto;
    operar(async () => {
      await eliminar(id);
      setProductos(lista => lista.filter(item => item.id !== id));
    }, 'Producto eliminado.');
  }

  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtrados = productos.filter(p => (categoria === 'Todos' || (p.categoria || 'Otros') === categoria) && normalizar(p.nombre + ' ' + (p.descripcion || '')).includes(normalizar(busqueda.trim())));
  const borrando = modal?.tipo === 'eliminar';
  const titulo = borrando ? 'Eliminar producto' : modal?.producto ? 'Editar producto' : 'Agregar producto';

  return (
    <>
      <section className="fondo-suave"><div className="container seccion hero-productos"><div><p className="eyebrow">Catálogo orientativo</p><h1>Todo lo que tenemos en el mostrador.</h1><p>Este es un listado de referencia de los productos que solemos tener. Si no encontrás algo, llamanos: probablemente lo tengamos o lo conseguimos.</p><a className="boton" href="tel:+541147096085">Consultar disponibilidad</a></div><Foto tipo="mortero" descripcion="Mortero verde claro acompañado por hojas y semillas" /></div></section>
      <section className="container seccion catalogo">
        <div className="filtros"><label className="buscador"><span className="sr-only">Buscar productos</span><input type="search" placeholder="Buscar un producto…" value={busqueda} onChange={e => setBusqueda(e.target.value)} /></label><div className="categorias" role="group" aria-label="Filtrar por categoría">{['Todos', ...categorias].map(nombre => <button key={nombre} className={categoria === nombre ? 'activo' : 'secundario'} aria-pressed={categoria === nombre} onClick={() => setCategoria(nombre)}>{nombre}</button>)}</div></div>
        <div className="gestion"><button className="secundario" aria-pressed={gestion} onClick={() => setGestion(!gestion)}>{gestion ? 'Cerrar gestión' : 'Gestionar productos'}</button>{gestion && <button disabled={estado !== 'listo'} onClick={() => abrir('crear')}>Agregar producto</button>}</div>
        <Aviso aviso={modal ? null : aviso} />
        {estado === 'cargando' && <p role="status">Cargando productos…</p>}
        {estado === 'error' && <button className="secundario" onClick={cargar}>Reintentar</button>}
        {estado === 'listo' && <><p className="sr-only" role="status">{filtrados.length} productos encontrados</p>{filtrados.length ? <TablaProductos productos={filtrados} abrir={abrir} gestion={gestion} /> : <p className="vacio">{productos.length ? 'No encontramos productos con esos filtros.' : 'Todavía no hay productos cargados. Podés agregarlos desde Gestionar productos.'}</p>}</>}
      </section>

      {modal && (
        <Dialogo titulo={titulo} cerrar={cerrar} ocupado={ocupado}>
          <Aviso aviso={aviso} />
          {borrando ? (
            <>
              <p>Â¿QuerÃ©s eliminar <strong>{modal.producto.nombre}</strong> del inventario?</p>
              <div className="acciones">
                <button className="secundario" onClick={cerrar} disabled={ocupado} autoFocus>Cancelar</button>
                <button className="peligro" onClick={confirmar} disabled={ocupado}>
                  {ocupado ? 'Eliminandoâ€¦' : 'Eliminar producto'}
                </button>
              </div>
            </>
          ) : <ProductoForm categorias={categorias} producto={modal.producto} guardar={guardar} cerrar={cerrar} ocupado={ocupado} />}
        </Dialogo>
      )}
    </>
  );
}
