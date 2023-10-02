import { ITask } from '../../types/ITasks';

export interface ITasksAction {
  type: string;
  payload: ITask;
}

export interface ITasksReducer {
  tasks: ITask[];
  currentId: number;
  activeTask: ITask;
}
