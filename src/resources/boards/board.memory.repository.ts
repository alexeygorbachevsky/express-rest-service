import { IBoard } from './board.model';
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

const TABLE_NAME: TableNames = 'Boards';

const getAll = async (): Promise<IBoard[]> => getAllEntities(TABLE_NAME);

const get = async (id: string): Promise<IBoard> => {
  const board: IBoard = await getEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

const post = async (board: IBoard): Promise<IBoard> =>
  saveEntity(TABLE_NAME, board);

const put = async (id: string, board: IBoard): Promise<IBoard> => {
  const entity: IBoard = await updateEntity(TABLE_NAME, id, board);
  if (!entity) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for editing`,
      Errors.NOT_FOUND
    );
  }
  return entity;
};

const remove = async (id: string): Promise<IBoard> => {
  const board: IBoard = await removeEntity(TABLE_NAME, id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

module.exports = { getAll, get, remove, post, put };
