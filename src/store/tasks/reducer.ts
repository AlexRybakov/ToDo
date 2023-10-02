import { ITask } from '../../types/ITasks';
import { ITasksAction } from './types';

export const initialState = {
  tasks: [] as ITask[],
  currentId: 0,
  activeTask: {} as ITask,
};

const tasksReducer = (state = initialState, action: ITasksAction) => {
  switch (action.type) {
    case 'tasks/setTasks':
      return { ...state, tasks: action.payload };
    case 'tasks/setActiveTask':
      return { ...state, activeTask: action.payload };
    case 'tasks/addTask':
      return { ...state, tasks: action.payload, currentId: ++state.currentId };
    case 'tasks/setTasksState':
      return action.payload;
    default:
      return state;
  }
};

export default tasksReducer;
