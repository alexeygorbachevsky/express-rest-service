import { IUser } from './user.model';
import { TableNames } from '../../db/fakeDB';

const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
} = require('../../db/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME: TableNames = 'Users';

const getAll = async (): Promise<IUser[]> => getAllEntities(TABLE_NAME);

const get = async (id: string): Promise<IUser> => {
  const user: IUser = await getEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(`User with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return user;
};

const post = async (user: IUser): Promise<IUser> => {
  const newUser: IUser = await saveEntity(TABLE_NAME, user);
  if (!newUser) {
    throw new ErrorDefiner(`User is not saved`, Errors.NOT_FOUND);
  }
  return newUser;
};

const put = async (id: string, newData: IUser): Promise<IUser> => {
  const user: IUser = await updateEntity(TABLE_NAME, id, newData);
  if (!user) {
    throw new ErrorDefiner(`User is not found for updating`, Errors.NOT_FOUND);
  }
  return user;
};

const remove = async (id: string): Promise<IUser> => {
  const user: IUser = await removeEntity(TABLE_NAME, id);
  if (!user) {
    throw new ErrorDefiner(
      `User with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return user;
};

module.exports = { getAll, get, post, remove, put };
