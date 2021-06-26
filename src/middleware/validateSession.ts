import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const writeToFile = require('../logger/writeToFile');

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  }
  const sessionToken = req.headers.authorization;
  if (!sessionToken) {
    // eslint-disable-next-line no-console
    console.error('Status code:', 401, 'No token provided.');
    writeToFile(`Status code: ${401}. No token provided.`);
    res.status(401).send({ auth: false, message: 'No token provided.' });
    return;
  }
  jwt.verify(sessionToken.slice(7), 'secret', (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Status code:', 401, 'Not authorized.');
      writeToFile(`Status code: ${401}. Not authorized.`);
      res.status(401).send({ error: 'Not authorized.' });
    }
  });
  next();
};

module.exports = validateSession;
