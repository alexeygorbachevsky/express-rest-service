const boardsRepo = require('./board.memory.repository');

/**
 * @module Board Service
 */

/**
 * @import {BoardInstance} from './board.model.js'
 */

/**
 * Get all boards. Returns the promise that resolves with array of all boards
 * @returns {Promise<BoardInstance[]>} - Array of all boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get board by id. Returns the promise that resolves with board object
 * @param {string} id - Board Id
 * @returns {Promise<BoardInstance>} - Board object
 */
const get = id => boardsRepo.get(id);

/**
 * Create new board. Returns the promise that resolves with board object
 * @param {BoardInstance} board - Board object
 * @returns {Promise<BoardInstance>} - Board object
 */
const post = board => boardsRepo.post(board);

/**
 * Change board info. Returns the promise that resolves with updated board object
 * @param {string} id - Board ID
 * @param {Object} board - Board Data that will be changed
 * @returns {Promise<BoardInstance>} - Board object that was updated
 */
const put = (id, board) => boardsRepo.put(id, board);

/**
 * Remove existed board. Returns the promise that resolves with removed board object
 * @param {string} id - Board ID
 * @returns {Promise<BoardInstance>} - Board object that was removed
 */
const remove = id => boardsRepo.remove(id);


module.exports = { getAll, get, remove, post, put };
