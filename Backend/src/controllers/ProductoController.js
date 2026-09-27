import ProductoService from "../services/ProductoService.js";
import ApiResponse from "../responses/ApiResponse.js";
import HttpStatus from "../enums/HttpStatus.js";

class ProductoController {
  getAll(req, res, next) {
    try {
      const productos = ProductoService.getAll();
      return ApiResponse.success(res, HttpStatus.OK, "Productos obtenidos correctamente", productos);
    } catch (error) {
      next(error);
    }
  }

  getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const producto = ProductoService.getById(id);
      return ApiResponse.success(res, HttpStatus.OK, "Producto obtenido correctamente", producto);
    } catch (error) {
      next(error);
    }
  }

  create(req, res, next) {
    try {
      const producto = ProductoService.create(req.body);
      return ApiResponse.success(res, HttpStatus.CREATED, "Producto creado correctamente", producto);
    } catch (error) {
      next(error);
    }
  }

  update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const producto = ProductoService.update(id, req.body);
      return ApiResponse.success(res, HttpStatus.OK, "Producto actualizado correctamente", producto);
    } catch (error) {
      next(error);
    }
  }

  delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      ProductoService.delete(id);
      return ApiResponse.success(res, HttpStatus.OK, "Producto eliminado correctamente");
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductoController();
