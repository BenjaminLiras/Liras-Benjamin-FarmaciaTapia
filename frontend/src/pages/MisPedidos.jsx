import React, { useEffect, useState } from 'react';
import Aviso from '../components/Aviso.jsx';
import Dialogo from '../components/Dialogo.jsx';
import { cancelarPedido, listarPedidos } from '../services/pedidos.js';
import { moneda } from '../utils/pedidos.js';

const fecha = new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' });

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [seleccion, setSeleccion] = useState(null);
  const [ocupado, setOcupado] = useState(false);

  async function cargar() {
    setAviso(null);
    try {
      setPedidos(await listarPedidos());
    } catch (error) {
      setAviso({ tipo: 'error', mensaje: error.message });
    }
  }

  useEffect(() => { cargar(); }, []);

  async function cancelar() {
    setOcupado(true);
    setAviso(null);
    try {
      const actualizado = await cancelarPedido(seleccion.id);
      setPedidos(lista => lista.map(pedido => pedido.id === actualizado.id ? actualizado : pedido));
      setSeleccion(null);
      setAviso({ tipo: 'exito', mensaje: 'Pedido cancelado.' });
    } catch (error) {
      setAviso({ tipo: 'error', mensaje: error.message });
    } finally {
      setOcupado(false);
    }
  }

  function cerrar() {
    setSeleccion(null);
    setAviso(null);
  }

  return (
    <section className="container seccion seccion-pedidos">
      <h1>Mis pedidos</h1>
      <p>Acá aparecen los pedidos que hiciste desde este navegador.</p>
      <div className="acciones acciones-pedido">
        <a className="enlace" href="/productos">Volver al catálogo</a>
        <a className="enlace" href="/carrito">Ver carrito</a>
      </div>
      <Aviso aviso={seleccion ? null : aviso} />
      {pedidos === null && (aviso ? <button className="secundario" onClick={cargar}>Reintentar</button> : <p role="status">Cargando pedidos…</p>)}
      {pedidos?.length === 0 && <p className="vacio">Todavía no hiciste pedidos.</p>}
      <div className="lista-tarjetas">
        {pedidos?.map(pedido => (
          <article className="tarjeta" key={pedido.id}>
            <h2>Pedido {pedido.id.slice(0, 8).toUpperCase()}</h2>
            <p><time dateTime={pedido.fecha}>{fecha.format(new Date(pedido.fecha))}</time> · {pedido.estado === 'cancelado' ? 'Cancelado' : 'Confirmado para retirar'}</p>
            <ul className="lineas-pedido">{pedido.detalles.map(item => (
              <li key={item.productoId}>{item.cantidad} × {item.nombre} · {moneda.format(item.subtotal)}</li>
            ))}</ul>
            <p><strong>Total: {moneda.format(pedido.total)}</strong></p>
            {pedido.estado === 'confirmado' && <button type="button" className="secundario borrar"
              onClick={() => { setAviso(null); setSeleccion(pedido); }}>Cancelar pedido</button>}
          </article>
        ))}
      </div>
      {seleccion && (
        <Dialogo titulo="Cancelar pedido" cerrar={cerrar} ocupado={ocupado}>
          <Aviso aviso={aviso} />
          <p>¿Querés cancelar el pedido {seleccion.id.slice(0, 8).toUpperCase()} y liberar los productos reservados?</p>
          <div className="acciones">
            <button type="button" className="secundario" autoFocus disabled={ocupado} onClick={cerrar}>Volver</button>
            <button type="button" className="peligro" disabled={ocupado} onClick={cancelar}>
              {ocupado ? 'Cancelando…' : 'Confirmar cancelación'}
            </button>
          </div>
        </Dialogo>
      )}
    </section>
  );
}
