const Errors = require('./constants');

export interface IErrorDefiner extends Error {
  status: number;
}

class ErrorDefiner extends Error implements IErrorDefiner {
  constructor(message = 'Internal Server Error', status = Errors.SERVER_ERROR) {
    super(message);
    this.status = status;
  }

  status: number;
}

module.exports = { ErrorDefiner };
