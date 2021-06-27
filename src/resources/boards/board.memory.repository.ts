import { getRepository } from 'typeorm';
import Board, { IBoard } from './board.model';

const { ErrorDefiner } = require('../../errors/errors');
const Errors = require('../../errors/constants');

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
  const { columns, ...rest } = board;
  const updatedBoard = await getRepository(Board).update(id, rest);
  if (!updatedBoard || (updatedBoard && !updatedBoard.raw)) {
    throw new ErrorDefiner(
      `Board with ${id} id is not updated`,
      Errors.NOT_FOUND
    );
  }
  return updatedBoard.raw;
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
