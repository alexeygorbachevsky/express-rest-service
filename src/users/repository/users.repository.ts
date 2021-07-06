import { getRepository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import User from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

@Injectable()
class UsersRepository {
  findAll = async () => getRepository(User).find();

  findOne = async (id: string) => {
    const user = await getRepository(User).findOne(id);
    if (!user) {
      throw new HttpException(
        `User with ${id} id is not found`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  };

  create = async (user: IUser) => {
    const newUser = await getRepository(User).save(user);
    if (!newUser) {
      throw new HttpException(`User is not saved`, HttpStatus.NOT_FOUND);
    }
    return newUser;
  };

  update = async (id: string, newData: IUser) => {
    const user = await getRepository(User).update(id, newData);
    if (!user || (user && !user.raw)) {
      throw new HttpException(
        `User is not found for updating`,
        HttpStatus.NOT_FOUND
      );
    }
    return user.raw;
  };

  remove = async (id: string) => {
    const user = await getRepository(User).delete(id);
    if (!user) {
      throw new HttpException(
        `User with ${id} id is not found for removing`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  };
}

export default UsersRepository;
