import ProductoRepository from "../repositories/ProductoRepository.js";
import { BadRequestError, NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

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

  #validar({ nombre, precio, stock }) {
    const esInvalido =
      !nombre ||
      typeof nombre !== "string" ||
      precio === undefined ||
      precio < 0 ||
      stock === undefined ||
      stock < 0;

    if (esInvalido) {
      throw new BadRequestError(Messages.INVALID_DATA);
    }
  }
}

export default new ProductoService();
