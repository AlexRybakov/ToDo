import { ITasksReducer } from '../store/tasks/types';

export interface IProject {
  id: number;
  title: string;
  tasksState: ITasksReducer;
}
