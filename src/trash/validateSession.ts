import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const writeToFile = require('../logger/writeToFile');
const { JWT_SECRET } = require('../common/config');
const { BEARER } = require('../common/constants');
const Errors = require('../errors/constants');

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) {
    // eslint-disable-next-line no-console
    console.error(`Status code: ${Errors.AUTH_FAILED}. No token provided.`);
    writeToFile(`Status code: ${Errors.AUTH_FAILED}. No token provided.`);
    res
      .status(Errors.AUTH_FAILED)
      .send({ auth: false, message: 'No token provided.' });
    return;
  }
  jwt.verify(
    sessionToken.slice(BEARER.length + 1),
    `${JWT_SECRET}`,
    (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(`Status code: ${Errors.AUTH_FAILED}. Not authorized.`);
        writeToFile(`Status code: ${Errors.AUTH_FAILED}. Not authorized.`);
        res.status(Errors.AUTH_FAILED).send({ error: 'Not authorized.' });
      }
    }
  );
  next();
};

module.exports = validateSession;
