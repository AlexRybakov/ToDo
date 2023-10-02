import { ITask } from './ITasks';

export interface IBoard {
  id: number;
  title: string;
  tasks: ITask[];
}
