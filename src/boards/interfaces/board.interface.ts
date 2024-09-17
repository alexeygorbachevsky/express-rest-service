import { IColumn } from './column.interface';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[] | null;
}
