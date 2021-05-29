const uuid = require('uuid');

/**
 * Column object
 * @typedef {Object} ColumnObject
 * @property {string} id - Column Id
 * @property {string} title - Column title
 * @property {number} order - Column order
 */

/**
 * Board object
 * @typedef {Object} BoardInstance
 * @property {string} id - Board Id
 * @property {string} title - Board title
 * @property {ColumnObject[]} columns - Board columns
 */

/**
 * Creates a new User.
 * @class
 */
class Board {
  /**
   * Board object
   * @param {string} id - Board Id
   * @param {string} title - Board title
   * @param {ColumnObject[]} columns - Board columns
   */
  constructor({
    id = uuid.v1(),
    title = 'TITLE',
    columns = [{ id: '', title: '', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * @static
   * @param  {Object} body - Body properties
   * @return {BoardInstance} - Board object
   */
  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
