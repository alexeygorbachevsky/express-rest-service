const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
} = require('../../db/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME = 'Users';

/**
 * @module User Repository
 */

/**
 * @import {UserInstance} from './user.model.js'
 */

/**
 * Get all users from db. Returns the promise that resolves with array of all users
 * @returns {Promise<UserInstance[]>} - Array of all users
 */
const getAll = async () => getAllEntities(TABLE_NAME);

/**
 * Get user by id from db. Returns the promise that resolves with user object
 * @param {string} id - User Id
 * @returns {Promise<UserInstance>} - User object
 */
const get = async (id) => {
  const user = await getEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(`User with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return user;
};

/**
 * Register (add to db) new user. Returns the promise that resolves with user object
 * @param {UserInstance} user - User object
 * @returns {Promise<UserInstance>} - User object
 */
const post = async (user) => {
  const newUser = await saveEntity(TABLE_NAME, user);
  if (!newUser) {
    throw new ErrorDefiner(`User is not saved`, Errors.NOT_FOUND);
  }
  return newUser;
};

/**
 * Remove existed user from db. Returns the promise that resolves with removed user object
 * @param {string} id - User ID
 * @returns {Promise<UserInstance>} - User object that was removed
 */
const remove = async (id) => {
  const user = await removeEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(
      `User with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return user;
};

/**
 *  Change user info in db. Returns the promise that resolves with updated user object
 * @param {string} id - User ID
 * @param {Object} newData - User Data that will be changed
 * @returns {Promise<UserInstance>} - User object that was updated
 */
const put = async (id, newData) => {
  const user = await updateEntity(TABLE_NAME, id, newData);
  if (!user) {
    throw new ErrorDefiner(`User is not found for updating`, Errors.NOT_FOUND);
  }
  return user;
};

module.exports = { getAll, get, post, remove, put };
