import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import UsersRepository from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  findAll(): Promise<IUser[]> {
    return this.usersRepo.findAll();
  }

  findOne(id: string): Promise<IUser> {
    return this.usersRepo.findOne(id);
  }

  create(user: IUser): Promise<IUser> {
    return this.usersRepo.create(user);
  }

  update(id: string, newData: IUser): Promise<IUser> {
    return this.usersRepo.update(id, newData);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.usersRepo.remove(id);
  }
}
