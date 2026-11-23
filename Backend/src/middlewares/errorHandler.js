import ApiResponse from "../responses/ApiResponse.js";
import HttpStatus from "../enums/HttpStatus.js";
import { Messages } from "../enums/Messages.js";
import AppError from "../exceptions/AppError.js";

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return ApiResponse.error(res, err.statusCode, err.message);
  }

  if (err.type === 'entity.parse.failed') {
    return ApiResponse.error(res, HttpStatus.BAD_REQUEST, 'El cuerpo de la solicitud debe ser JSON válido.');
  }
  if (err.type === 'entity.too.large') {
    return ApiResponse.error(res, 413, 'La solicitud es demasiado grande.');
  }

  console.error(err);
  return ApiResponse.error(res, HttpStatus.INTERNAL_SERVER_ERROR, Messages.INTERNAL_ERROR);
}

export default errorHandler;
