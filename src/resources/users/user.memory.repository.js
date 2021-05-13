const { getAllEntities, getEntity } = require('../../utils/memoryDB');

const TABLE_NAME = 'Users';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async (id) => getEntity(TABLE_NAME, id);

module.exports = { getAll, get };
