import { IUser } from './user.model';

const usersRepo = require('./user.memory.repository');

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const get = (id: string): Promise<IUser> => usersRepo.get(id);

const post = (user: IUser): Promise<IUser> => usersRepo.post(user);

const put = (id: string, newData: IUser): Promise<IUser> =>
  usersRepo.put(id, newData);

const remove = (id: string): Promise<IUser> => usersRepo.remove(id);

module.exports = { getAll, get, post, remove, put };
