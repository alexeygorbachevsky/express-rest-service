import { Request, Response } from 'express';

export {};
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { asyncWrap } = require('../../errors/errorHandlers');

router.route('/').get(
  asyncWrap(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncWrap(async (req: Request, res: Response) => {
    const user = await usersService.get(req.params['id']);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/').post(
  asyncWrap(async (req: Request, res: Response) => {
    const user = await usersService.post(User.fromRequest(req.body));
    res.status(201).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncWrap(async (req: Request, res: Response) => {
    const user = await usersService.remove(req.params['id']);
    res.status(204).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  asyncWrap(async (req: Request, res: Response) => {
    const user = await usersService.put(req.params['id'], req.body);
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
