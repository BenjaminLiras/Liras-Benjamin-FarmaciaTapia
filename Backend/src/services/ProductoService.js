import ProductoRepository from "../repositories/ProductoRepository.js";
import { BadRequestError, NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

import { categorias } from '../data/categorias.js';

class ProductoService {
  getAll() {
    return ProductoRepository.findAll();
  }

  getById(id) {
    const producto = ProductoRepository.findById(id);
    if (!producto) {
      throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
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
      throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
    }
    return producto;
  }

  delete(id) {
    const eliminado = ProductoRepository.delete(id);
    if (!eliminado) {
      throw new NotFoundError(Messages.PRODUCT_NOT_FOUND);
    }
  }

  #validar(data) {
    if (!data || typeof data !== 'object') throw new BadRequestError(Messages.INVALID_DATA);
    const { nombre, descripcion, precio, stock, categoria } = data;
    const invalido = typeof nombre !== 'string' || !nombre.trim() ||
      !Number.isFinite(precio) || precio < 0 ||
      !Number.isSafeInteger(stock) || stock < 0 ||
      (descripcion !== undefined && typeof descripcion !== 'string') ||
      (categoria !== undefined && !categorias.includes(categoria));
    if (invalido) throw new BadRequestError(Messages.INVALID_DATA);
  }
}

export default new ProductoService();
