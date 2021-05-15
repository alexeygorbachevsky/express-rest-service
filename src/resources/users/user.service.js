const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const post = user => usersRepo.post(user);

const remove = id => usersRepo.remove(id);

const put = (id, newData) => usersRepo.put(id, newData);

module.exports = { getAll, get, post, remove, put };
