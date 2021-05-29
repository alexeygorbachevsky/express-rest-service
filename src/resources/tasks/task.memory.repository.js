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

/**
 * @module Task Repository
 */

/**
 * @import {TaskInstance} from './task.model.js'
 */

/**
 * Get all tasks from db. Returns the promise that resolves with array of all tasks
 * @returns {Promise<TaskInstance[]>} - Array of all tasks
 */
const getAll = async (id) =>
  getAllEntities(TABLE_NAME).filter(({ boardId }) => boardId === id);

/**
 * Get task by boardId id and task id from db. Returns the promise that resolves with task object
 * @param {string} boardId - Board Id
 * @param {string} id - Task Id
 * @returns {Promise<TaskInstance>} - Task object
 */
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

/**
 * Create (add to db) new task. Returns the promise that resolves with task object
 * @param {TaskInstance} task - Task object
 * @returns {Promise<TaskInstance>} - Task object
 */
const post = async (task) => {
  const newTask = await saveEntity(TABLE_NAME, task);
  if (!newTask) {
    throw new ErrorDefiner(`Task is not saved`, Errors.NOT_FOUND);
  }
  return newTask;
};

/**
 *  Change task info in db. Returns the promise that resolves with updated task object
 * @param {Object} task - Task Data that will be changed
 * @returns {Promise<TaskInstance>} - Task object that was updated
 */
const put = async (task) => {
  await get(task.boardId, task.id);
  return updateEntity(TABLE_NAME, task.id, task);
};

/**
 * Remove existed task from db. Returns the promise that resolves with removed task object
 * @param {string} boardId - Board ID
 * @param {string} id - Task ID
 * @returns {Promise<TaskInstance>} - Task object that was removed
 */
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

module.exports = { getAll, get, remove, post, put };
