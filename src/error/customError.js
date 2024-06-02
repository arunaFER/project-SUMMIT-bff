// customError.js
class CustomError extends Error {
  constructor(statusCode, message, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || "INTERNAL_SERVER_ERROR";
  }
}

export default CustomError;
