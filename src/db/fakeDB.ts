import { IUser } from '../resources/users/user.model';
import { IBoard } from '../resources/boards/board.model';
import { ITask } from '../resources/tasks/task.model';

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

export type TableNames= "Boards" | "Tasks" | "Users";
type UnionModelArrays = (IUser|ITask|IBoard)[];
type UnionModels = ITask | IBoard | IUser | undefined;

type Db={
  Users: IUser[],
  Boards: IBoard[],
  Tasks: ITask[],
  normalize: (removingEntity: UnionModels, tableName: string)=>void
}

const db:Db = {
  Users: [],
  Boards: [],
  Tasks: [],
  normalize(removingEntity, tableName) {
    switch (tableName) {
      case 'Users': {
        this.Tasks = this.Tasks.map((task) => ({ ...task, userId: '' }));
        break;
      }
      case 'Boards': {
        this.Tasks = this.Tasks.filter(
          ({ boardId }) => boardId !== removingEntity?.id
        );
        break;
      }
      default: {
        break;
      }
    }
  },
};

const getAllEntities = (tableName: TableNames): UnionModelArrays => db[tableName];

const getEntity = (tableName: TableNames, id: string): UnionModels =>
  (db[tableName] as UnionModelArrays).find((entity: UnionModels) => id === entity?.id);

const saveEntity = (tableName: TableNames, entity: ITask & IBoard & IUser): UnionModels => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const removeEntity = (tableName: TableNames, entityId: string): UnionModels => {
  const removingEntity = getEntity(tableName, entityId);
  if (removingEntity) {
    (db[tableName] as UnionModelArrays) = (db[tableName] as UnionModelArrays).filter(
      (entity: UnionModels) => entity?.id !== entityId
    );
    db.normalize(removingEntity, tableName);
  }
  return removingEntity;
};

const updateEntity = (
  tableName: TableNames,
  updatingEntityId: string,
  newData: UnionModels
): UnionModels => {
  const entityId = db[tableName].findIndex(
    (entity: UnionModels) => entity?.id === updatingEntityId
  );
  if (entityId !== -1) {
    (db[tableName][entityId] as UnionModels) = {
      ...db[tableName][entityId],
      ...newData,
    } as UnionModels;
  }
  return getEntity(tableName, updatingEntityId);
};

(() => {
  Array(3)
    .fill(null)
    .forEach(() => {
      db.Users.push(new User());
    });
  const board1 = new Board();
  const board2 = new Board();
  const task1 = new Task({ userId: db.Users[0]?.id, boardId: board1.id });
  const task2 = new Task({ userId: db.Users[1]?.id, boardId: board2.id });
  db.Boards.push(board1, board2);
  db.Tasks.push(task1, task2);
})();

module.exports = {
  getAllEntities,
  getEntity,
  saveEntity,
  removeEntity,
  updateEntity,
};
