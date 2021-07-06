import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import User from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { HttpExceptionFilter } from '../../errors/http-exception.filter';
import { JwtAuthGuard } from '../../authorization/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    // map user fields to exclude secret fields like "password"
    return users.map(User.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return User.toResponse(user);
  }

  @Post()
  async create(@Body() userData: IUser) {
    const user = await this.usersService.create(User.fromRequest(userData));
    return User.toResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newData: IUser) {
    const user = await this.usersService.update(id, newData);
    return User.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
