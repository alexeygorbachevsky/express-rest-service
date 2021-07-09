import {
  Module,
  NestModule,
  // MiddlewareConsumer,
  // RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import config from './common/ormconfig';
import { AuthorizationModule } from './authorization/authorization.module';
import { AuthorizationService } from './authorization/services/authorization.service';
import AuthRepository from './authorization/repository/auth.repository';

// import { LoggerMiddleware } from './middleware/logger.middleware';
// const { USE_FASTIFY } = require('./common/config');

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthorizationService, AuthRepository],
})
export class AppModule implements NestModule {
  configure() {}

  // configure(_consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: USE_FASTIFY === 'true' ? '(.*)' : '/',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
