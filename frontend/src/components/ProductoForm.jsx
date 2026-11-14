import React from 'react';

export default function ProductoForm({ producto, guardar, cerrar, ocupado, categorias }) {
  function enviar(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    guardar({
      nombre: datos.get('nombre').trim(),
      categoria: datos.get('categoria'),
      descripcion: datos.get('descripcion').trim(),
      precio: Number(datos.get('precio')),
      stock: Number(datos.get('stock')),
    });
  }

  return (
    <form onSubmit={enviar}>
      <fieldset disabled={ocupado}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" defaultValue={producto?.nombre}
          pattern=".*\S.*" title="Ingresá al menos un carácter visible" required autoFocus />
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" name="categoria" defaultValue={producto?.categoria || 'Otros'} required>
          {categorias.map(categoria => <option key={categoria}>{categoria}</option>)}
        </select>
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" defaultValue={producto?.descripcion} rows="3" />
        <label htmlFor="precio">Precio (ARS)</label>
        <input id="precio" name="precio" type="number" defaultValue={producto?.precio} min="0" step="0.01" required />
        <label htmlFor="stock">Stock</label>
        <input id="stock" name="stock" type="number" defaultValue={producto?.stock} min="0" step="1" required />
        <div className="acciones">
          <button type="button" className="secundario" onClick={cerrar}>Cancelar</button>
          <button type="submit">{ocupado ? 'Guardando…' : 'Guardar producto'}</button>
        </div>
      </fieldset>
    </form>
  );
}
