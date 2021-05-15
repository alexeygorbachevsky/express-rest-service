class ErrorDefiner extends Error {
  constructor(message = 'Not found', status=500) {
    super(message);
    this.status = status;
  }
}

module.exports = { ErrorDefiner };
