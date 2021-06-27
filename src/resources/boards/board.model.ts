import { v1 as uuid } from 'uuid';
import {
  Entity,
  Column as TColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Column, { IColumn } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[] | null;
}

@Entity({ name: 'board' })
class Board implements IBoard {
  constructor(
    { id = uuid(), title = '', columns = null }: IBoard = {} as IBoard
  ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn('varchar', { length: 50 })
  title: string;

  @OneToMany(() => Column, ({ board }: { board: IBoard }) => board, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  columns: IColumn[] | null;

  static fromRequest(body: IBoard): IBoard {
    return new Board(body);
  }
}

export default Board;
