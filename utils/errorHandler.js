function errorHandler(res, code, message) {
  res.status(code).json({ error: { message } });

  let error = new Error(message);

  return error;
  //return errors with error code etc.
}

exports.errorHandler = errorHandler;