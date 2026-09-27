import ProductoRepository from "../repositories/ProductoRepository.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ValidationException from "../exceptions/ValidationException.js";

class ProductoService {
  getAll() {
    return ProductoRepository.findAll();
  }

  getById(id) {
    const producto = ProductoRepository.findById(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  create(data) {
    this.#validar(data);
    return ProductoRepository.create(data);
  }

  update(id, data) {
    this.#validar(data);
    const producto = ProductoRepository.update(id, data);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  delete(id) {
    const eliminado = ProductoRepository.delete(id);
    if (!eliminado) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  }

  #validar({ nombre, precio, stock }) {
    if (!nombre || typeof nombre !== "string") {
      throw new ValidationException("El nombre del producto es obligatorio");
    }
    if (precio === undefined || precio < 0) {
      throw new ValidationException("El precio debe ser un número mayor o igual a 0");
    }
    if (stock === undefined || stock < 0) {
      throw new ValidationException("El stock debe ser un número mayor o igual a 0");
    }
  }
}

export default new ProductoService();
