import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repository/auth.repository';
import { IUser } from '../../users/interfaces/user.interface';

const { JWT_SECRET } = require('../../common/config');

@Injectable()
export class AuthorizationService {
  constructor(private authRepository: AuthRepository) {}

  async validateUser(login: string, password: string) {
    if (!login || !password) {
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);
    }
    const user = await this.authRepository.findOne(login);

    if (user) {
      try {
        if (await bcrypt.compare(password, user.password)) {
          return user;
        }
      } catch (err) {
        throw new HttpException(
          'Failed to authenticate token.',
          HttpStatus.UNAUTHORIZED
        );
      }
      throw new HttpException(
        'Passwords do not match.',
        HttpStatus.UNAUTHORIZED
      );
    } else {
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);
    }
  }

  async login(user: IUser) {
    return {
      message: 'Successfully authenticated.',
      token: jwt.sign({ userId: user.id, login: user.login }, `${JWT_SECRET}`, {
        expiresIn: 60 * 60 * 24,
      }),
    };
  }
}
