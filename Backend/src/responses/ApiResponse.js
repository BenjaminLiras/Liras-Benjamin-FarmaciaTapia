class ApiResponse {
  static success(res, statusCode, data = null) {
    return res.status(statusCode).json({ success: true, data });
  }

  static error(res, statusCode, message) {
    return res.status(statusCode).json({ success: false, message });
  }
}

export default ApiResponse;
