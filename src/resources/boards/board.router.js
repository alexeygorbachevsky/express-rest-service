const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { asyncWrap } = require('../../errors/errorHandlers');

router.route('/').get(
  asyncWrap(async (req, res) => {
    const boards = await boardService.getAll();
    await res.json(boards);
  })
);

router.route('/:id').get(
  asyncWrap(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
  })
);

router.route('/').post(
  asyncWrap(async (req, res) => {
    const board = await boardService.post(Board.fromRequest(req.body));
    res.status(201).send(board);
  })
);

router.route('/:id').delete(
  asyncWrap(async (req, res) => {
    const board = await boardService.remove(req.params.id);
    res.status(204).send(board);
  })
);

router.route('/:id').put(
  asyncWrap(async (req, res) => {
    const board = await boardService.put(Board.fromRequest(req.body));
    res.status(200).send(board);
  })
);

module.exports = router;
