import React from 'react';

const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export default function TablaProductos({ productos, abrir, gestion }) {
  return <div className="tarjetas tres productos-grid">{productos.map(producto => <article className="tarjeta producto" key={producto.id}><p className="eyebrow">{producto.categoria || 'Otros'}</p><h3>{producto.nombre}</h3>{producto.descripcion && <p>{producto.descripcion}</p>}<div className="producto-pie"><span>{producto.stock > 0 ? 'Disponible · ' + moneda.format(producto.precio) : 'Consultá stock'}</span><a className="enlace" href="tel:+541147096085" aria-label={'Consultar por ' + producto.nombre}>Pedir →</a></div>{gestion && <><p>Stock: {producto.stock} · Precio: {moneda.format(producto.precio)}</p><div className="acciones"><button className="secundario" aria-label={'Editar ' + producto.nombre} onClick={() => abrir('editar', producto)}>Editar</button><button className="secundario borrar" aria-label={'Eliminar ' + producto.nombre} onClick={() => abrir('eliminar', producto)}>Eliminar</button></div></>}</article>)}</div>;
}
