import { Injectable } from '@nestjs/common';
import BoardsRepository from '../repository/boards.repository';
import { IBoard } from '../interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  findAll() {
    return this.boardsRepository.findAll();
  }

  findOne(id: string) {
    return this.boardsRepository.findOne(id);
  }

  create(newBoard: IBoard) {
    return this.boardsRepository.create(newBoard);
  }

  update(id: string, newBoard: IBoard) {
    return this.boardsRepository.update(id, newBoard);
  }

  remove(id: string) {
    return this.boardsRepository.remove(id);
  }
}
