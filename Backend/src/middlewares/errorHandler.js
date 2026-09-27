import ApiResponse from "../responses/ApiResponse.js";
import HttpStatus from "../enums/HttpStatus.js";
import { Messages } from "../enums/Messages.js";
import AppError from "../exceptions/AppError.js";

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return ApiResponse.error(res, err.statusCode, err.message);
  }

  console.error(err);
  return ApiResponse.error(res, HttpStatus.INTERNAL_SERVER_ERROR, Messages.INTERNAL_ERROR);
}

export default errorHandler;
