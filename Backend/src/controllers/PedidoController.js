import PedidoService from '../services/PedidoService.js';
import ApiResponse from '../responses/ApiResponse.js';
import HttpStatus from '../enums/HttpStatus.js';

export default class PedidoController {
  static listar(req, res, next) {
    try {
      const pedidos = PedidoService.listar(req.get('Authorization'));
      return ApiResponse.success(res.set('Cache-Control', 'no-store'), HttpStatus.OK, pedidos);
    } catch (error) {
      next(error);
    }
  }

  static crear(req, res, next) {
    try {
      const pedido = PedidoService.crear(req.get('Authorization'), req.body);
      return ApiResponse.success(res.set('Cache-Control', 'no-store'), HttpStatus.CREATED, pedido);
    } catch (error) {
      next(error);
    }
  }

  static cancelar(req, res, next) {
    try {
      const pedido = PedidoService.cancelar(req.get('Authorization'), req.params.id);
      return ApiResponse.success(res.set('Cache-Control', 'no-store'), HttpStatus.OK, pedido);
    } catch (error) {
      next(error);
    }
  }
}
