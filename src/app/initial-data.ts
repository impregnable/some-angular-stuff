import { ITodoList } from './interfaces/itodo-list';

export const INITIAL_DATA: ITodoList[] = [
  { id: 0, title: 'Homeworks', content: [], amount: 0 },
  { id: 1, title: 'Shopping', content: [{id: 0, name: 'apple'}, {id: 1, name: 'bread'}, {id: 2, name: 'meat'}, {id: 3, name: 'milk'}], amount: 4 },
  { id: 2, title: 'Others', content : [{id: 0, name: 'gym'}, {id: 1, name: 'girls'}, {id: 2, name: 'games'}, {id: 3, name: 'wateva'}], amount: 4 }
];
