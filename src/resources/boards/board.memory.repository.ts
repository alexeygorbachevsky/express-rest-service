import { getRepository } from 'typeorm';
import { IBoard } from './board.model';

const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');
const Board = require('./board.model');

const getAll = async () => getRepository(Board).find();

const get = async (id: string) => {
  const board = await getRepository(Board).findOne(id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

const post = async (board: IBoard) => getRepository(Board).save(board);

const put = async (id: string, board: IBoard) => {
  const entity = await getRepository(Board).update(id, board);
  if (!entity || (entity && !entity.raw)) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for editing`,
      Errors.NOT_FOUND
    );
  }
  return entity.raw;
};

const remove = async (id: string) => {
  const board = await getRepository(Board).delete(id);
  if (!board) {
    throw new ErrorDefiner(
      `Board with ${id} id is not found for removing`,
      Errors.NOT_FOUND
    );
  }
  return board;
};

module.exports = { getAll, get, remove, post, put };
