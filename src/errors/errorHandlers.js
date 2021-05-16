const { ErrorDefiner } = require('./errors');
const Errors = require('./constants');

const asyncWrap = (fn) => (req, res, next, ...args) => {
  const fnReturn = fn(req, res, next, ...args);
  return Promise.resolve(fnReturn).catch(next);
};

const appErrorHandler = (err, req, res, next) => {
  switch(true){
    case(err instanceof ErrorDefiner):{
      res.sendStatus(err.status);
      break;
    }
    default:{
      res.sendStatus(Errors.SERVER_ERROR);
    }

  }
  next();
};

module.exports = { appErrorHandler, asyncWrap };
