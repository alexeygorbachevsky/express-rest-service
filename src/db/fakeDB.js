const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

/**
 * @module Memory DB
 */

/**
 * @import {UserInstance} from '../resources/users/user.model.js'
 * @import {TaskInstance} from '../resources/tasks/task.model.js'
 * @import {BoardInstance} from '../resources/boards/board.model.js'
 */

/**
 * Normalize db structure when users or boards deleted
 * @typedef {function} Normalize
 * @param {Object} removingEntity - entity that was removed
 * @param {string} tableName - tableName of entity that was removed
 * @returns {void}
 */

/**
 * Memory DB
 * @typedef {Object} fakeDB
 * @property {UserInstance[]} Users - Array of users
 * @property {BoardInstance[]}  Boards - Array of boards
 * @property {TaskInstance[]}  Tasks - Array of tasks
 * @property {Normalize}  normalize - function that normalizes db structure
 */

/**
 * @type {fakeDB}
 */
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
  },
};

/**
 * Get all entities from specified db table. Returns the array of all found entities
 * @param {string} tableName - Table name of target db table from where need to return entities
 * @returns {Array<Object>} - Array of all entities
 */
const getAllEntities = (tableName) => db[tableName];

/**
 * Get entity by id from db
 * @param {string} tableName - Name of table from where need to return specified entity
 * @param {string} id - Entity Id
 * @returns {Object} - Entity object
 */
const getEntity = (tableName, id) =>
  db[tableName].find((entity) => id === entity.id);

/**
 * Save entity to db
 * @param {string} tableName - Name of table where need to save specified entity
 * @param {Object} entity - Entity data that need to save
 * @returns {Object} - Saved entity object
 */
const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

/**
 * Remove entity from db
 * @param {string} tableName - Name of table from where need to remove specified entity
 * @param {string} entityId - Id of removing entity
 * @returns {Object} - Removed entity
 */
const removeEntity = (tableName, entityId) => {
  const removingEntity = getEntity(tableName, entityId);
  if (removingEntity) {
    db[tableName] = db[tableName].filter(({ id }) => id !== entityId);
    db.normalize(removingEntity, tableName);
  }
  return removingEntity;
};

/**
 * Update entity in db
 * @param {string} tableName - Name of table from where need to remove specified entity
 * @param {string} updatingEntityId - Id of updating entity
 * @param {Object} newData - New data that should be pasted instead of old data
 * @returns {Object} - Updated entity
 */
const updateEntity = (tableName, updatingEntityId, newData) => {
  const entityId = db[tableName].findIndex(({ id }) => id === updatingEntityId);
  if (entityId !== -1) {
    db[tableName][entityId] = {
      ...db[tableName][entityId],
      ...newData,
    };
  }
  return getEntity(tableName, updatingEntityId);
};

/**
 * Initial db filling (IIFE). Populates the database with initial data
 */
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
