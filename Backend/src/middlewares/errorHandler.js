import ApiResponse from "../responses/ApiResponse.js";
import HttpStatus from "../enums/HttpStatus.js";

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  return ApiResponse.error(res, statusCode, err.message || "Error interno del servidor");
}

export default errorHandler;
