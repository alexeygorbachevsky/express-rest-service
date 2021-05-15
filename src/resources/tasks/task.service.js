const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, id) => taskRepo.get(boardId, id);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

const post = task => taskRepo.post(task);

const put = task => taskRepo.put(task);

module.exports = { getAll, get, remove, post, put };
