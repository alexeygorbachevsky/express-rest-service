const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const { asyncWrap } = require('../../errors/errorHandlers');

router.route('/').get(
  asyncWrap(async (req, res) => {
    const boards = await taskService.getAll(req.params.boardId);
    await res.json(boards);
  })
);

router.route('/:id').get(
  asyncWrap(async (req, res) => {
    const board = await taskService.get(req.params.boardId, req.params.id);
    res.status(200).send(board);
  })
);

router.route('/').post(
  asyncWrap(async (req, res) => {
    const board = await taskService.post(
      Task.fromRequest({ ...req.body, boardId: req.params.boardId })
    );
    res.status(201).send(board);
  })
);

router.route('/:id').delete(
  asyncWrap(async (req, res) => {
    await taskService.remove(req.params.boardId, req.params.id);
    res.sendStatus(204);
  })
);

router.route('/:id').put(
  asyncWrap(async (req, res) => {
    const board = await taskService.put(
      Task.fromRequest({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId,
      })
    );
    res.status(200).send(board);
  })
);

module.exports = router;
