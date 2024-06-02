// errorHandler.js
import CustomError from "../error/customError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ code: err.code, message: err.message });
  } else {
    res
      .status(500)
      .json({ code: "INTERNAL_SERVER_ERROR", message: err.message });
  }
};

export default errorHandler;
