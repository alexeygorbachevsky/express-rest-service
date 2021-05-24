const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
} = require('../../db/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME = 'Tasks';

const getAll = async (id) =>
  getAllEntities(TABLE_NAME).filter(({ boardId }) => boardId === id);

const get = async (boardId, id) => {
  const task = await getEntity(TABLE_NAME, id);
  if (!task) {
    throw new ErrorDefiner(`Task with ${id} id is not found`, Errors.NOT_FOUND);
  }
  if (boardId !== task.boardId) {
    throw new ErrorDefiner(
      `Task with ${id} is not found. This task is located in another board.`,
      Errors.NOT_FOUND
    );
  }
  return task;
};

const post = async (task) => {
  const newTask = await saveEntity(TABLE_NAME, task);
  if (!newTask) {
    throw new ErrorDefiner(`Task is not saved`, Errors.NOT_FOUND);
  }
  return newTask;
};

const remove = async (boardId, id) => {
  const task = await removeEntity(TABLE_NAME, id);
  if (!task || boardId !== task.boardId) {
    throw new ErrorDefiner(
      `Task with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return task;
};

const put = async (task) => {
  await get(task.boardId, task.id);
  return updateEntity(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, post, put };
