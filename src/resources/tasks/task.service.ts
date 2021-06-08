import { ITask } from './task.model';

const taskRepo = require('./task.memory.repository');

const getAll = (boardId: string): Promise<ITask[]> => taskRepo.getAll(boardId);

const get = (boardId: string, id: string): Promise<ITask> =>
  taskRepo.get(boardId, id);

const post = (task: ITask): Promise<ITask> => taskRepo.post(task);

const put = (task: ITask): Promise<ITask> => taskRepo.put(task);

const remove = (boardId: string, id: string): Promise<ITask> =>
  taskRepo.remove(boardId, id);

module.exports = { getAll, get, remove, post, put };
