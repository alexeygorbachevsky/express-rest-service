import { getRepository } from 'typeorm';
import User, { IUser } from './user.model';

const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');


const getAll = async () => getRepository(User).find();

const get = async (id: string) => {
  const user = await getRepository(User).findOne(id);
  if (!user) {
    throw new ErrorDefiner(`User with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return user;
};

const post = async (user: IUser) => {
  const newUser = await getRepository(User).save(user);
  if (!newUser) {
    throw new ErrorDefiner(`User is not saved`, Errors.NOT_FOUND);
  }
  return newUser;
};

const put = async (id: string, newData: IUser) => {
  const user = await getRepository(User).update(id, newData);
  if (!user || (user && !user.raw)) {
    throw new ErrorDefiner(`User is not found for updating`, Errors.NOT_FOUND);
  }
  return user.raw;
};

const remove = async (id: string) => {
  const user = await getRepository(User).delete(id);
  if (!user) {
    throw new ErrorDefiner(
      `User with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return user;
};

module.exports = { getAll, get, post, remove, put };
