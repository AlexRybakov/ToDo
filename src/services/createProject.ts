import { ITasksReducer } from '../store/tasks/types';

class Project {
  id: number;
  title: string;
  description: string;
  tasksState: ITasksReducer;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tasksState = {} as ITasksReducer;
  }
}

export default Project;
