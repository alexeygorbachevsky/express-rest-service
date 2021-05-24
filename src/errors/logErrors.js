const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  next(err);
};

module.exports = logErrors;
