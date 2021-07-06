import { Injectable } from '@nestjs/common';
import TasksRepository from '../repository/tasks.repository';
import { ITask } from '../interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(private tasksRepo: TasksRepository) {}

  findAll(boardId: string) {
    return this.tasksRepo.findAll(boardId);
  }

  findOne(boardId: string, id: string) {
    return this.tasksRepo.findOne(boardId, id);
  }

  create(task: ITask) {
    return this.tasksRepo.create(task);
  }

  update(task: ITask) {
    return this.tasksRepo.update(task);
  }

  remove(boardId: string, id: string) {
    return this.tasksRepo.remove(boardId, id);
  }
}
