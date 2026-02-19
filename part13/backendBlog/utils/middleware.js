const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      error: error.message,
    });
  } else if (
    error.name === "SequelizeValidationError" &&
    !/[a-z0-9._%+-]+@[a-z0-9.-]\.(com|vn|org)/gi.test(req.body.username)
  ) {
    return res.status(400).send({
      error: "Validation isEmail on username failed",
    });
  } else if (error.name === "SequelizeValidationError") {
    return res.status(400).send({
      error: error.message,
    });
  }

  next(error);
};

module.exports = { errorHandler };
