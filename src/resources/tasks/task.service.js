const taskRepo = require('./task.memory.repository');

/**
 * @module Task Service
 */

/**
 * @import {TaskInstance} from './task.model.js'
 */

/**
 * Get all tasks. Returns the promise that resolves with array of all tasks
 * @param {string} boardId - Board Id
 * @returns {Promise<TaskInstance[]>} - Array of all tasks
 */
const getAll = boardId => taskRepo.getAll(boardId);

/**
 * Get task by task id and board id. Returns the promise that resolves with task object
 * @param {string} boardId - Board Id
 * @param {string} id - Task Id
 * @returns {Promise<TaskInstance>} - Task object
 */
const get = (boardId, id) => taskRepo.get(boardId, id);

/**
 * Register new task. Returns the promise that resolves with task object
 * @param {TaskInstance} task - Task object
 * @returns {Promise<TaskInstance>} - Task object
 */
const post = task => taskRepo.post(task);

/**
 * Change task info. Returns the promise that resolves with updated task object
 * @param {Object} task - Task Data that will be changed
 * @returns {Promise<TaskInstance>} - Task object that was updated
 */
const put = task => taskRepo.put(task);

/**
 * Remove existed task by board id and task id. Returns the promise that resolves with removed task object
 * @param {string} boardId - Board ID
 * @param {string} id - Task ID
 * @returns {Promise<TaskInstance>} - Task object that was removed
 */
const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, get, remove, post, put };
