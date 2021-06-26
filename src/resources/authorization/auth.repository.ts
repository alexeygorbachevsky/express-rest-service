import { getRepository } from 'typeorm';
import User from '../users/user.model';

const get = async (login: string) =>
  getRepository(User).findOne({ where: { login } });

module.exports = { get };
