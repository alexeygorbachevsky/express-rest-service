const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  normalize(removingEntity, tableName) {
    switch (tableName) {
      case 'Users': {
        this.Tasks = this.Tasks.map((task) => ({ ...task, userId: null }));
        break;
      }
      case 'Boards': {
        this.Tasks = this.Tasks.filter(
          ({ boardId }) => boardId !== removingEntity.id
        );
        break;
      }
      default: {
        break;
      }
    }
  }
};

const getAllEntities = (tableName) => db[tableName];

const getEntity = (tableName, id) =>
  db[tableName].find((entity) => id === entity.id);

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const removeEntity = (tableName, entityId) => {
  const removingEntity = getEntity(tableName, entityId);
  if (removingEntity) {
    db[tableName] = db[tableName].filter(({ id }) => id !== entityId);
    db.normalize(removingEntity, tableName);
  }
  return removingEntity;
};


const updateEntity = (tableName, updatingEntityId, newData) => {
  const entityId = db[tableName].findIndex(({ id }) => id === updatingEntityId);
  if (entityId !== -1) {
    db[tableName][entityId] = {
      ...db[tableName][entityId],
      ...newData
    };
  }
  return getEntity(tableName, updatingEntityId);
};

// Init db filling
(() => {
  Array(3)
    .fill(null)
    .forEach(() => {
      db.Users.push(new User());
    });
  const board1 = new Board();
  const board2 = new Board();
  const task1 = new Task({ userId: db.Users[0].id, boardId: board1.id });
  const task2 = new Task({ userId: db.Users[1].id, boardId: board2.id });
  db.Boards.push(board1, board2);
  db.Tasks.push(task1, task2);
})();

module.exports = {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity
};
