export {};
const uuid = require('uuid');

type Column = {
  id: string;
  title: string;
  order: number;
};

export interface IBoard {
  id: string;
  title: string;
  columns: Column[];
}

class Board implements IBoard {
  constructor({
    id = uuid.v1(),
    title = 'TITLE',
    columns = [{ id: '', title: '', order: 0 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  id: string;

  title: string;

  columns: Column[];

  static fromRequest(body: IBoard): IBoard {
    return new Board(body);
  }
}

module.exports = Board;
