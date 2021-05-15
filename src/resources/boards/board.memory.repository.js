const { getAllEntities, getEntity, saveEntity, removeEntity, updateEntity } = require('../../helpers/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME = 'Boards';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async id => {
  const board = await getEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(`Board with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return board;
};

const save = async board => saveEntity(TABLE_NAME, board);

const remove = async id => {
  const board = await removeEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(`Board with ${id} id is not found for removing`, Errors.NOT_FOUND);
  }
  return board;
};

const update = async (id, board) => {
  const entity = await updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new ErrorDefiner(`Couldn't find a board with id: ${id}`, Errors.NOT_FOUND);
  }

  return entity;
};

module.exports = { getAll, get, remove, save, update };
