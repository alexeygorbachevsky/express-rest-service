import { Request, Response } from 'express';
import Task from './task.model';

const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { asyncWrap } = require('../../middleware/asyncWrapper');

router.route('/').get(
  asyncWrap(async (req: Request, res: Response) => {
    const tasks = await taskService.getAll(req.params['boardId']);
    await res.json(tasks);
  })
);

router.route('/:id').get(
  asyncWrap(async (req: Request, res: Response) => {
    const task = await taskService.get(
      req.params['boardId'],
      req.params['id']
    );
    res.status(200).send(task);
  })
);

router.route('/').post(
  asyncWrap(async (req: Request, res: Response) => {
    const task = await taskService.post(
      Task.fromRequest({ ...req.body, boardId: req.params['boardId'] })
    );
    res.status(201).send(task);
  })
);

router.route('/:id').delete(
  asyncWrap(async (req: Request, res: Response) => {
    await taskService.remove(req.params['boardId'], req.params['id']);
    res.sendStatus(204);
  })
);

router.route('/:id').put(
  asyncWrap(async (req: Request, res: Response) => {
    const task = await taskService.put(
      Task.fromRequest({
        ...req.body,
        id: req.params['id'],
        boardId: req.params['boardId'],
      })
    );
    res.status(200).send(task);
  })
);

module.exports = router;
