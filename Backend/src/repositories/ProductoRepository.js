import Producto from "../models/Producto.js";
import { nextId } from "../utils/idGenerator.js";

const productos = [];

class ProductoRepository {
  findAll() {
    return productos;
  }

  findById(id) {
    return productos.find((producto) => producto.id === id) || null;
  }

  create({ nombre, descripcion, precio, stock }) {
    const producto = new Producto(nextId(), nombre, descripcion, precio, stock);
    productos.push(producto);
    return producto;
  }

  update(id, { nombre, descripcion, precio, stock }) {
    const producto = this.findById(id);
    if (!producto) return null;

    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.stock = stock;
    return producto;
  }

  delete(id) {
    const index = productos.findIndex((producto) => producto.id === id);
    if (index === -1) return false;

    productos.splice(index, 1);
    return true;
  }
}

export default new ProductoRepository();
