import { ITodoListItem } from './itodo-list-item';

export interface ITodoList {
  id: number;
  title: string;
  content: ITodoListItem[];
  amount: number;
}
