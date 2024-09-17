import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getRepository } from 'typeorm';
import Task from '../entities/task.entity';
import { ITask } from '../interfaces/task.interface';

@Injectable()
class TasksRepository {
  async findAll(boardId: string) {
    return getRepository(Task).find({ where: { boardId } });
  }

  async findOne(boardId: string, id: string) {
    const task = await getRepository(Task).findOne(id, { where: { boardId } });
    if (!task) {
      throw new HttpException(
        `Task with ${id} id is not found`,
        HttpStatus.NOT_FOUND
      );
    }
    return task;
  }

  async create(task: ITask): Promise<ITask> {
    const newTask: ITask = await getRepository(Task).save(task);
    if (!newTask) {
      throw new HttpException(`Task is not saved`, HttpStatus.NOT_FOUND);
    }
    return newTask;
  }

  async update(task: ITask) {
    if (task && task.id && task.boardId) {
      await getRepository(Task).update(task.id, task);
      return this.findOne(task.boardId, task.id);
    }
    throw new HttpException(`Task is not updated`, HttpStatus.NOT_FOUND);
  }

  async remove(_boardId: string, id: string) {
    const task = await getRepository(Task).delete(id);
    if (!task) {
      throw new HttpException(
        `Task with ${id} id is not found for removing`,
        HttpStatus.NOT_FOUND
      );
    }
    return task;
  }
}

export default TasksRepository;
