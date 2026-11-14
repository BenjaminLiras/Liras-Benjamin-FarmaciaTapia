import { existsSync, readFileSync, mkdirSync, writeFileSync, renameSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Producto from '../models/Producto.js';

const archivo = process.env.PRODUCTOS_ARCHIVO || fileURLToPath(new URL('../../data/productos.json', import.meta.url));
let productos = existsSync(archivo) ? JSON.parse(readFileSync(archivo, 'utf8')) : [];
productos = productos.map(producto => ({ ...producto, categoria: producto.categoria || 'Otros' }));
let siguienteId = Math.max(0, ...productos.map(producto => producto.id)) + 1;

function guardar(lista) {
  mkdirSync(dirname(archivo), { recursive: true });
  writeFileSync(archivo + '.tmp', JSON.stringify(lista, null, 2), 'utf8');
  renameSync(archivo + '.tmp', archivo);
  productos = lista;
}

class ProductoRepository {
  findAll() { return productos; }

  findById(id) { return productos.find(producto => producto.id === id) || null; }

  create({ nombre, descripcion = '', precio, stock, categoria = 'Otros' }) {
    const producto = new Producto(siguienteId, nombre.trim(), descripcion.trim(), precio, stock, categoria);
    guardar([...productos, producto]);
    siguienteId += 1;
    return producto;
  }

  update(id, { nombre, descripcion = '', precio, stock, categoria }) {
    const anterior = this.findById(id);
    if (!anterior) return null;
    const producto = new Producto(id, nombre.trim(), descripcion.trim(), precio, stock, categoria ?? anterior.categoria);
    guardar(productos.map(item => item.id === id ? producto : item));
    return producto;
  }

  delete(id) {
    if (!this.findById(id)) return false;
    guardar(productos.filter(producto => producto.id !== id));
    return true;
  }
}

export default new ProductoRepository();
