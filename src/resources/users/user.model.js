const uuid = require('uuid');

/**
 * User object
 * @typedef {Object} UserInstance
 * @property {string} id - User Id
 * @property {string} name - User Name
 * @property {string} login - User Login
 * @property {string} password - User Password
 */

/**
 * Creates a new User.
 * @class
 */
class User {
  /**
   * User class constructor
   * @param {string} id - User Id
   * @param {string} name - User Name
   * @param {string} login - User Login
   * @param {string} password - User Password
   */
  constructor({
    id = uuid.v1(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * @static
   * @param  {UserInstance} user - User object
   * @return {Object} - Object with all user properties except password
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * @static
   * @param  {Object} body - Body properties
   * @return {UserInstance} - User object
   */
  static fromRequest(body) {
    return new User(body);
  }
}

module.exports = User;
