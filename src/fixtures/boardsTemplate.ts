import { ITask } from '../types/ITasks';

export const boardsTemplate = [
  { id: 0, title: 'queue', tasks: [] as ITask[] },
  { id: 1, title: 'development', tasks: [] as ITask[] },
  { id: 2, title: 'done', tasks: [] as ITask[] },
];

export default boardsTemplate;
