import React from 'react';
import { moneda } from '../utils/pedidos.js';

export default function TablaProductos({ productos, abrir, gestion, agregarAlCarrito }) {
  return (
    <div className="tarjetas tres productos-grid">
      {productos.map(producto => (
        <article className="tarjeta producto" key={producto.id}>
          <p className="eyebrow">{producto.categoria || 'Otros'}</p>
          <h3>{producto.nombre}</h3>
          {producto.descripcion && <p>{producto.descripcion}</p>}
          <div className="producto-pie">
            <span>{producto.stock > 0 ? 'Disponible · ' + moneda.format(producto.precio) : 'Sin stock'}</span>
            {producto.stock > 0 && (
              <button type="button" className="enlace"
                aria-label={'Agregar ' + producto.nombre + ' al carrito'}
                onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
            )}
          </div>
          {gestion && (
            <>
              <p>Stock: {producto.stock} · Precio: {moneda.format(producto.precio)}</p>
              <div className="acciones">
                <button type="button" className="secundario" aria-label={'Editar ' + producto.nombre}
                  onClick={() => abrir('editar', producto)}>Editar</button>
                <button type="button" className="secundario borrar" aria-label={'Eliminar ' + producto.nombre}
                  onClick={() => abrir('eliminar', producto)}>Eliminar</button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
