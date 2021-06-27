import { getRepository } from 'typeorm';
import Task, { ITask } from './task.model';

const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const getAll = async (id: string) =>
  getRepository(Task).find({ where: { boardId: id } });

const get = async (boardId: string, id: string) => {
  const task = await getRepository(Task).findOne(id, { where: { boardId } });
  if (!task) {
    throw new ErrorDefiner(`Task with ${id} id is not found`, Errors.NOT_FOUND);
  }
  return task;
};

const post = async (task: ITask): Promise<ITask> => {
  const newTask: ITask = await getRepository(Task).save(task);
  if (!newTask) {
    throw new ErrorDefiner(`Task is not saved`, Errors.NOT_FOUND);
  }
  return newTask;
};

const put = async (task: ITask) => {
  if (task && task.id && task.boardId) {
    await getRepository(Task).update(task.id, task);
    return get(task.boardId, task.id);
  }
  throw new ErrorDefiner(`Task is not updated`, Errors.NOT_FOUND);
};

const remove = async (_boardId: string, id: string) => {
  const task = await getRepository(Task).delete(id);
  if (!task) {
    throw new ErrorDefiner(
      `Task with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return task;
};

module.exports = { getAll, get, remove, post, put };
