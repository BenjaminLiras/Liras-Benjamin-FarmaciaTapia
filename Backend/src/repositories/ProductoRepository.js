import Producto from '../models/Producto.js';
import { guardarAlmacen, leerAlmacen } from './AlmacenRepository.js';

class ProductoRepository {
  findAll() {
    return leerAlmacen().productos;
  }

  findById(id) {
    return this.findAll().find(producto => producto.id === id) || null;
  }

  create({ nombre, descripcion = '', precio, stock, categoria = 'Otros' }) {
    const { siguienteProductoId } = leerAlmacen();
    const producto = new Producto(siguienteProductoId, nombre.trim(), descripcion.trim(), precio, stock, categoria);
    guardarAlmacen({
      productos: [...this.findAll(), producto],
      siguienteProductoId: siguienteProductoId + 1,
    });
    return producto;
  }

  update(id, { nombre, descripcion = '', precio, stock, categoria }) {
    const anterior = this.findById(id);
    if (!anterior) return null;
    const producto = new Producto(id, nombre.trim(), descripcion.trim(), precio, stock, categoria ?? anterior.categoria);
    guardarAlmacen({ productos: this.findAll().map(item => item.id === id ? producto : item) });
    return producto;
  }

  delete(id) {
    if (!this.findById(id)) return false;
    guardarAlmacen({ productos: this.findAll().filter(producto => producto.id !== id) });
    return true;
  }
}

export default new ProductoRepository();
