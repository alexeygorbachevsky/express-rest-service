const Errors = require('./constants');

class ErrorDefiner extends Error {
  constructor(message = 'Not found', status = Errors.NOT_FOUND) {
    super(message);
    this.status = status;
  }

  status: number;
}

module.exports = { ErrorDefiner };
