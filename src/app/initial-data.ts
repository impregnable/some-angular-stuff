import { ITodoList } from './interfaces/itodo-list';

export const INITIALDATA: ITodoList[] = [
  { id: 0, title: 'Homeworks', content: [], amount: 0 },
  { id: 1, title: 'Shopping', content: ['apple', 'bread', 'meat', 'milk'], amount: 4 },
  { id: 2, title: 'Others', content : ['gym', 'girls', 'games', 'wateva'], amount: 4 }
];
