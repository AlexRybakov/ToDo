import { ITask } from '../types/ITasks';
import mockTasks from './mockTasks';

export const mockProject = {
  id: 0,
  title: 'Тестовый проект',
  tasksState: {
    tasks: mockTasks as ITask[],
    currentId: 9,
    activeTask: {} as ITask,
  },
};
