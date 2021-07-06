import { v1 as uuid } from 'uuid';
import {
  Entity,
  Column as TColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IColumn } from '../interfaces/column.interface';
// eslint-disable-next-line import/no-cycle
import Board from './board.entity';
import { IBoard } from '../interfaces/board.interface';

@Entity({ name: 'column' })
class Column implements IColumn {
  constructor({ id = uuid(), title = '', order = 0 }: IColumn = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.boardId = '';
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TColumn('varchar', { length: 50 })
  title: string;

  @TColumn('integer')
  order: number;

  @TColumn('varchar')
  boardId: string;

  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board!: IBoard;
}

export default Column;
