import { getRepository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IBoard } from '../interfaces/board.interface';
import Board from '../entities/board.entity';

@Injectable()
class BoardsRepository {
  async findAll() {
    return getRepository(Board).find();
  }

  async findOne(id: string) {
    const board = await getRepository(Board).findOne(id);
    if (!board) {
      throw new HttpException(
        `Board with ${id} id is not found`,
        HttpStatus.NOT_FOUND
      );
    }
    return board;
  }

  async create(board: IBoard) {
    return getRepository(Board).save(board);
  }

  async update(id: string, board: IBoard) {
    const { columns, ...rest } = board;
    const updatedBoard = await getRepository(Board).update(id, rest);
    if (!updatedBoard || (updatedBoard && !updatedBoard.raw)) {
      throw new HttpException(
        `Board with ${id} id is not updated`,
        HttpStatus.NOT_FOUND
      );
    }
    return updatedBoard.raw;
  }

  async remove(id: string) {
    const board = await getRepository(Board).delete(id);
    if (!board) {
      throw new HttpException(
        `Board with ${id} id is not found for removing`,
        HttpStatus.NOT_FOUND
      );
    }
    return board;
  }
}

export default BoardsRepository;
