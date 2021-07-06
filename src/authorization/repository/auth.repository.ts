import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from '../../users/entities/user.entity';

@Injectable()
class AuthRepository {
  async findOne(login: string) {
    return getRepository(User).findOne({ where: { login } });
  }
}

export default AuthRepository;
