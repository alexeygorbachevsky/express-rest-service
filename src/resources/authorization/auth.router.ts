import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

const jwt = require('jsonwebtoken');

const router = require('express').Router();

const authService = require('./auth.service');
const { asyncWrap } = require('../../middleware/asyncWrapper');

router.route('/').post(
  asyncWrap(async (req: Request, res: Response) => {
    if (req.body && (!req.body.login || !req.body.password)) {
      res.status(404).send({ error: 'User not found.' });
    }

    const user = await authService.get(req.body.login);

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (err) {
          res.status(401).send({ error: 'Failed to authenticate token.' });
        }
        if (matches) {
          res.json({
            user,
            message: 'Successfully authenticated.',
            token: jwt.sign({ userId: user.id, login: user.login }, 'secret', {
              expiresIn: 60 * 60 * 24,
            }),
          });
        } else {
          res.status(401).send({ error: 'Passwords do not match.' });
        }
      });
    } else {
      res.status(404).send({ error: 'User not found.' });
    }
  })
);

module.exports = router;
