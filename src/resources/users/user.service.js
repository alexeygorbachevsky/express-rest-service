const usersRepo = require('./user.memory.repository');

/**
 * @module User Service
 */

/**
 * @import {UserInstance} from './user.model.js'
 */

/**
 * Returns the promise that resolves with array of all users
 * @returns {Promise<UserInstance[]>} - Array of all users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns the promise that resolves with user object
 * @param {string} id - User Id
 * @returns {Promise<UserInstance>} - User object
 */
const get = (id) => usersRepo.get(id);

/**
 * Returns the promise that resolves with user object
 * @param {UserInstance} user - User object
 * @returns {Promise<UserInstance>} - User object
 */
const post = (user) => usersRepo.post(user);

/**
 * Returns the promise that resolves with removed user object
 * @param {string} id - User ID
 * @returns {Promise<UserInstance>} - User object that was removed
 */
const remove = (id) => usersRepo.remove(id);

/**
 * Returns the promise that resolves with updated user object
 * @param {string} id - User ID
 * @param {Object} newData - User Data that will be changed
 * @returns {Promise<UserInstance>} - User object that was updated
 */
const put = (id, newData) => usersRepo.put(id, newData);

module.exports = { getAll, get, post, remove, put };
