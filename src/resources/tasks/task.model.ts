export {};
const uuid = require('uuid');

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

class Task implements ITask {
  constructor({
    id = uuid.v1(),
    title = 'TITLE',
    order = 0,
    description = 'DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null,
  } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  static fromRequest(body:ITask): ITask {
    return new Task(body);
  }
}

module.exports = Task;
