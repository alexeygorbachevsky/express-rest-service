export {};
const uuid = require('uuid');

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User implements IUser {
  constructor({
    id = uuid.v1(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }={}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  id: string;

  name: string;

  login: string;

  password: string;

  static toResponse(user: IUser): Omit<User, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(body: IUser): IUser {
    return new User(body);
  }
}

module.exports = User;
