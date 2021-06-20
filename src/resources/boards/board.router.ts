import { Request, Response } from 'express';
import Board from './board.model';

const router = require('express').Router();
const boardService = require('./board.service');
const { asyncWrap } = require('../../middleware/asyncWrapper');

router.route('/').get(
  asyncWrap(async (_req: Request, res: Response) => {
    const boards = await boardService.getAll();
    await res.json(boards);
  })
);

router.route('/:id').get(
  asyncWrap(async (req: Request, res: Response) => {
    const board = await boardService.get(req.params['id']);
    res.status(200).send(board);
  })
);

router.route('/').post(
  asyncWrap(async (req: Request, res: Response) => {
    const board = await boardService.post(Board.fromRequest(req.body));
    res.status(201).send(board);
  })
);

router.route('/:id').delete(
  asyncWrap(async (req: Request, res: Response) => {
    const board = await boardService.remove(req.params['id']);
    res.status(204).send(board);
  })
);

router.route('/:id').put(
  asyncWrap(async (req: Request, res: Response) => {
    const board = await boardService.put(req.params['id'], req.body);
    res.status(200).send(board);
  })
);

module.exports = router;
