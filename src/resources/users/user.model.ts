import { v1 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'user' })
class User implements IUser {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 50 })
  password: string;

  static toResponse(user: IUser): Omit<User, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(body: IUser): IUser {
    return new User(body);
  }
}

export default User;
