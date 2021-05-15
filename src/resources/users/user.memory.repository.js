const { getAllEntities, getEntity, saveEntity, removeEntity, updateEntity } = require('../../helpers/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME = 'Users';

const getAll = async () => getAllEntities(TABLE_NAME);

const get = async (id) => {
  const user = await getEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(`User with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return user;
};

const post = async (user) => {
  const newUser = await saveEntity(TABLE_NAME, user);
  if (!newUser) {
    throw new ErrorDefiner(`User is not saved`, Errors.NOT_FOUND);
  }
  return newUser;
};

const remove = async (id) => {
  const user = await removeEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(`User with ${id} id is not found for removing`, Errors.NOT_FOUND);
  }
  return user;
};

const put = async (id, newData) => {
  const user = await updateEntity(TABLE_NAME, id, newData);
  if (!user) {
    throw new ErrorDefiner(`User is not found for updating`, Errors.NOT_FOUND);
  }
  return user;
};

module.exports = { getAll, get, post, remove, put };
