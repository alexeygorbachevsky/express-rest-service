import { ITask } from './task.model';
import { TableNames } from '../../db/fakeDB';

const {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
} = require('../../db/fakeDB');
const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

const TABLE_NAME: TableNames = 'Tasks';

const getAll = async (id: string): Promise<ITask[]> =>
  getAllEntities(TABLE_NAME).filter(({ boardId }: ITask) => boardId === id);

const get = async (boardId: string, id: string): Promise<ITask> => {
  const task: ITask = await getEntity(TABLE_NAME, id);
  if (!task) {
    throw new ErrorDefiner(`Task with ${id} id is not found`, Errors.NOT_FOUND);
  }
  if (boardId !== task.boardId) {
    throw new ErrorDefiner(
      `Task with ${id} is not found. This task is located in another board.`,
      Errors.NOT_FOUND
    );
  }
  return task;
};

const post = async (task: ITask): Promise<ITask> => {
  const newTask: ITask = await saveEntity(TABLE_NAME, task);
  if (!newTask) {
    throw new ErrorDefiner(`Task is not saved`, Errors.NOT_FOUND);
  }
  return newTask;
};

const put = async (task: ITask): Promise<ITask> => {
  if (task.boardId) {
    await get(task.boardId, task.id);
  }
  return updateEntity(TABLE_NAME, task.id, task);
};

const remove = async (boardId: string, id: string): Promise<ITask> => {
  const task: ITask = await removeEntity(TABLE_NAME, id);
  if (!task || boardId !== task.boardId) {
    throw new ErrorDefiner(
      `Task with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return task;
};

module.exports = { getAll, get, remove, post, put };
