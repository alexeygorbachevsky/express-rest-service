import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationService } from './services/authorization.service';
import AuthRepository from './repository/auth.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';

const { JWT_SECRET } = require('../common/config');

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '4800s' },
    }),
  ],
  providers: [AuthorizationService, AuthRepository, LocalStrategy, JwtStrategy],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
