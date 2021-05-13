const User = require('../resources/users/user.model');

const db = {
  Users: Array(3).fill(new User()),
  Boards: [],
  Tasks: [],
};

const getAllEntities = (tableName) => db[tableName];

const getEntity = (tableName, id) =>
  db[tableName].find((entity) => id === entity.id);

module.exports = { getAllEntities, getEntity };
