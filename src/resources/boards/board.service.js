const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const post = board => boardsRepo.post(board);

const put = (id, board) => boardsRepo.put(id, board);

const remove = id => boardsRepo.remove(id);


module.exports = { getAll, get, remove, post, put };
