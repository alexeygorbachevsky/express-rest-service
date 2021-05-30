import { IBoard } from './board.model';

const boardsRepo = require('./board.memory.repository');

const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

const get = (id: string): Promise<IBoard> => boardsRepo.get(id);

const post = (board: IBoard): Promise<IBoard> => boardsRepo.post(board);

const put = (id: string, board: IBoard): Promise<IBoard> =>
  boardsRepo.put(id, board);

const remove = (id: string): Promise<IBoard> => boardsRepo.remove(id);

module.exports = { getAll, get, remove, post, put };
