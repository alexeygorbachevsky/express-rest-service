import { IUser } from '../users/user.model';

const authRepo = require('./auth.repository');

const get = (login: string): Promise<IUser> => authRepo.get(login);

module.exports = { get };
