function errorHandler(res, code, message) {
  res.status(code).json({ error: { message } });

  let error = new Error(message);

  return error;
}

exports.errorHandler = errorHandler;