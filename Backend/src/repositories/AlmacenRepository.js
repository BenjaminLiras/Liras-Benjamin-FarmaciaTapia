import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const archivo = process.env.PRODUCTOS_ARCHIVO || fileURLToPath(new URL('../../data/productos.json', import.meta.url));
const datos = existsSync(archivo) ? JSON.parse(readFileSync(archivo, 'utf8').replace(/^\uFEFF/, '')) : [];
const anterior = Array.isArray(datos) ? { productos: datos, pedidos: [] } : datos;
let estado = {
  ...anterior,
  productos: anterior.productos.map(producto => ({ ...producto, categoria: producto.categoria || 'Otros' })),
  siguienteProductoId: anterior.siguienteProductoId ??
    anterior.productos.reduce((maximo, producto) => Math.max(maximo, producto.id), 0) + 1,
};

export function leerAlmacen() {
  return estado;
}

// Persistir el stock y los pedidos juntos evita dejar una operación a medias.
export function guardarAlmacen(cambios) {
  const actualizado = { ...estado, ...cambios };
  mkdirSync(dirname(archivo), { recursive: true });
  writeFileSync(archivo + '.tmp', JSON.stringify(actualizado, null, 2), 'utf8');
  renameSync(archivo + '.tmp', archivo);
  estado = actualizado;
}
