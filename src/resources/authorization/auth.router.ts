import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

const jwt = require('jsonwebtoken');

const router = require('express').Router();

const authService = require('./auth.service');
const { asyncWrap } = require('../../middleware/asyncWrapper');
const { JWT_SECRET } = require('../../common/config');
const Errors = require('../../errors/constants');

router.route('/').post(
  asyncWrap(async (req: Request, res: Response) => {
    if (req.body && (!req.body.login || !req.body.password)) {
      res.status(Errors.FORBIDDEN).send({ error: 'User not found.' });
    }

    const user = await authService.get(req.body.login);

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (err) {
          res.status(Errors.AUTH_FAILED).send({ error: 'Failed to authenticate token.' });
        }
        if (matches) {
          res.json({
            message: 'Successfully authenticated.',
            token: jwt.sign(
              { userId: user.id, login: user.login },
              `${JWT_SECRET}`,
              {
                expiresIn: 60 * 60 * 24,
              }
            ),
          });
        } else {
          res.status(Errors.AUTH_FAILED).send({ error: 'Passwords do not match.' });
        }
      });
    } else {
      res.status(Errors.FORBIDDEN).send({ error: 'User not found.' });
    }
  })
);

module.exports = router;
