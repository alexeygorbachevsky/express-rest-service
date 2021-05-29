const uuid = require('uuid');

/**
 * Task object
 * @typedef {Object} TaskInstance
 * @property {string} id - Task Id
 * @property {string} title - Task Name
 * @property {number} order - Task Order
 * @property {string} description - Task Description
 * @property {string} userId - User id
 * @property {string} boardId - Board id
 * @property {string} columnId - Column id
 */

/**
 * Creates a new Task.
 * @class
 */
class Task {
  /**
   * User class constructor
   * @param {string} id - Task Id
   * @param {string} title - Task Name
   * @param {number} order - Task Order
   * @param {string} description - Task Description
   * @param {string} userId - User id
   * @param {string} boardId - Board id
   * @param {string} columnId - Column id
   */
  constructor({
    id = uuid.v1(),
    title = 'TITLE',
    order = 0,
    description = 'DESCRIPTION',
    userId = '',
    boardId = '',
    columnId = ''
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * @static
   * @param  {Object} body - Body properties
   * @return {TaskInstance} - Task object
   */
  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
