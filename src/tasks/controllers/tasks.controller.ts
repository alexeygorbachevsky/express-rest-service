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
import { TasksService } from '../services/tasks.service';
import { ITask } from '../interfaces/task.interface';
import Task from '../entities/task.entity';
import { HttpExceptionFilter } from '../../errors/http-exception.filter';
import { JwtAuthGuard } from '../../authorization/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':id')
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.tasksService.findOne(boardId, id);
  }

  @Post()
  async create(@Body() newTask: ITask, @Param('boardId') boardId: string) {
    return this.tasksService.create(Task.fromRequest({ ...newTask, boardId }));
  }

  @Put(':id')
  async update(
    @Body() newTask: ITask,
    @Param('boardId') boardId: string,
    @Param('id') id: string
  ) {
    return this.tasksService.update(
      Task.fromRequest({
        ...newTask,
        id,
        boardId,
      })
    );
  }

  @Delete(':id')
  async remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.tasksService.remove(boardId, id);
  }
}
