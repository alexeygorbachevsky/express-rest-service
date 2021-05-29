const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
} = require('../../db/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME = 'Boards';

/**
 * @module Board Repository
 */

/**
 * @import {BoardInstance} from './board.model.js'
 */

/**
 * Get all boards from db. Returns the promise that resolves with array of all boards
 * @returns {Promise<BoardInstance[]>} - Array of all boards
 */
const getAll = async () => getAllEntities(TABLE_NAME);

/**
 * Get board by id from db. Returns the promise that resolves with board object
 * @param {string} id - Board Id
 * @returns {Promise<BoardInstance>} - Board object
 */
const get = async (id) => {
  const board = await getEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

/**
 * Create (add to db) new board. Returns the promise that resolves with board object
 * @param {BoardInstance} board - Board object
 * @returns {Promise<BoardInstance>} - Board object
 */
const post = async (board) => saveEntity(TABLE_NAME, board);

/**
 *  Change board info in db. Returns the promise that resolves with updated board object
 * @param {string} id - User ID
 * @param {Object} board - Board data that will be changed
 * @returns {Promise<BoardInstance>} - Board object that was updated
 */
const put = async (id, board) => {
  const entity = await updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for editing`,
      Errors.NOT_FOUND
    );
  }
  return entity;
};

/**
 * Remove existed board from db. Returns the promise that resolves with removed board object
 * @param {string} id - Board ID
 * @returns {Promise<BoardInstance>} - Board object that was removed
 */
const remove = async (id) => {
  const board = await removeEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

module.exports = { getAll, get, remove, post, put };
