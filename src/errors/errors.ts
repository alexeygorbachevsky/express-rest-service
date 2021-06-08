const Errors = require('./constants');

export interface IErrorDefiner extends Error{
  status: number
}

class ErrorDefiner extends Error implements IErrorDefiner {
  constructor(message = 'Not found', status = Errors.NOT_FOUND) {
    super(message);
    this.status = status;
  }

  status: number;
}

module.exports = { ErrorDefiner };
