import React, { useEffect, useRef, useState } from 'react';
import Aviso from '../components/Aviso.jsx';
import { confirmarPedido } from '../services/pedidos.js';
import { listar } from '../services/productos.js';
import { guardarCarrito, leerCarrito, moneda, precioEnCentavos } from '../utils/pedidos.js';

export default function Carrito() {
  const [carrito, setCarrito] = useState(leerCarrito);
  const [inventario, setInventario] = useState(null);
  const [falloInventario, setFalloInventario] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [pedido, setPedido] = useState(null);
  const enviando = useRef(false);

  async function cargar() {
    setFalloInventario(false);
    try {
      setInventario(await listar());
    } catch {
      setFalloInventario(true);
    }
  }

  useEffect(() => { cargar(); }, []);

  function cambiar(items) {
    try {
      setCarrito(guardarCarrito(items));
      setAviso(null);
    } catch {
      setAviso({ tipo: 'error', mensaje: 'No se pudo guardar el carrito en este navegador.' });
    }
  }

  const lineas = carrito.items.map(item => ({
    ...item,
    producto: inventario?.find(producto => producto.id === item.productoId),
  }));
  const total = lineas.reduce((importe, item) => importe +
    precioEnCentavos(item.producto?.precio ?? 0) * item.cantidad, 0) / 100;
  const stockInsuficiente = lineas.some(item => !item.producto || item.cantidad > item.producto.stock);

  async function enviar(evento) {
    evento.preventDefault();
    if (enviando.current || falloInventario || !inventario || stockInsuficiente || !lineas.length) return;

    const campos = new FormData(evento.currentTarget);
    enviando.current = true;
    setOcupado(true);
    setAviso(null);
    try {
      const confirmado = await confirmarPedido({
        referencia: carrito.referencia,
        cliente: { nombre: campos.get('nombre'), telefono: campos.get('telefono') },
        items: lineas.map(({ productoId, cantidad, producto }) => ({
          productoId, cantidad, precioUnitario: precioEnCentavos(producto.precio) / 100,
        })),
      });
      setPedido(confirmado);
      try {
        setCarrito(guardarCarrito([]));
      } catch {
        setAviso({ tipo: 'error', mensaje: 'El pedido se confirmó, pero no se pudo vaciar el carrito local.' });
      }
    } catch (error) {
      setAviso({ tipo: 'error', mensaje: error.message });
      await cargar();
    } finally {
      enviando.current = false;
      setOcupado(false);
    }
  }

  return (
    <section className="container seccion seccion-pedidos">
      <h1>Tu carrito</h1>
      <div className="acciones acciones-pedido">
        <a className="enlace" href="/productos">Volver al catálogo</a>
        <a className="enlace" href="/mis-pedidos">Mis pedidos</a>
      </div>
      <Aviso aviso={aviso} />
      {pedido ? (
        <article className="tarjeta">
          <h2>Pedido confirmado</h2>
          <p role="status">Tu pedido quedó reservado para retirar en Farmacia Tapia. Total: {moneda.format(pedido.total)}.</p>
          <a className="boton" href="/mis-pedidos">Ver mis pedidos</a>
        </article>
      ) : !lineas.length ? (
        <p className="vacio">Tu carrito está vacío. Agregá productos desde el catálogo.</p>
      ) : (
        <div className="carrito-grid">
          <section className="tarjeta" aria-labelledby="productos-carrito">
            <h2 id="productos-carrito">Productos</h2>
            {falloInventario ? (
              <p role="alert">No se pudo actualizar el catálogo. <button className="secundario" onClick={cargar}>Reintentar</button></p>
            ) : !inventario ? <p role="status">Consultando disponibilidad…</p> : null}
            <ul className="lineas-pedido">
              {lineas.map(({ productoId, cantidad, producto, nombre }) => (
                <li key={productoId} className="linea-carrito">
                  <div>
                    <strong>{producto?.nombre || nombre}</strong>
                    {producto && <p>{moneda.format(producto.precio)} por unidad</p>}
                    {inventario && !producto && <p>Producto fuera del catálogo.</p>}
                    {producto && cantidad > producto.stock && <p>Unidades disponibles: {producto.stock}.</p>}
                  </div>
                  <div className="controles-cantidad">
                    <button type="button" className="secundario" disabled={ocupado || cantidad <= 1}
                      aria-label={'Disminuir cantidad de ' + nombre}
                      onClick={() => cambiar(carrito.items.map(item => item.productoId === productoId ? { ...item, cantidad: cantidad - 1 } : item))}>−</button>
                    <span aria-label="Cantidad">{cantidad}</span>
                    <button type="button" className="secundario" disabled={ocupado || !producto || cantidad >= producto.stock}
                      aria-label={'Aumentar cantidad de ' + nombre}
                      onClick={() => cambiar(carrito.items.map(item => item.productoId === productoId ? { ...item, cantidad: cantidad + 1 } : item))}>+</button>
                    <button type="button" className="secundario borrar" disabled={ocupado}
                      aria-label={'Quitar ' + nombre}
                      onClick={() => cambiar(carrito.items.filter(item => item.productoId !== productoId))}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <form className="tarjeta formulario-pedido" onSubmit={enviar}>
            <h2>Retiro en el local</h2>
            <p>Retirá y pagá tu pedido en Francisco N. de Laprida 4255.</p>
            <fieldset disabled={ocupado}>
              <label htmlFor="cliente-nombre">Nombre</label>
              <input id="cliente-nombre" name="nombre" autoComplete="name" minLength={2} maxLength={80} required />
              <label htmlFor="cliente-telefono">Teléfono</label>
              <input id="cliente-telefono" name="telefono" type="tel" autoComplete="tel" minLength={7} maxLength={25} required />
              <p><strong>Total: {inventario && !falloInventario ? moneda.format(total) : '—'}</strong></p>
              <button disabled={!inventario || falloInventario || stockInsuficiente}>
                {ocupado ? 'Confirmando…' : 'Confirmar pedido'}
              </button>
            </fieldset>
          </form>
        </div>
      )}
    </section>
  );
}
