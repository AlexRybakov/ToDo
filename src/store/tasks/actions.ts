import { ITask } from '../../types/ITasks';
import { ITasksReducer } from './types';

export const setActiveTaskAction = (task: ITask) => {
  return {
    type: 'tasks/setActiveTask',
    payload: task,
  };
};

export const setTasksAction = (tasks: ITask[]) => {
  return {
    type: 'tasks/setTasks',
    payload: tasks,
  };
};

export const setAddTasksAction = (tasks: ITask[]) => {
  return {
    type: 'tasks/addTask',
    payload: tasks,
  };
};

export const setTasksStateAction = (state: ITasksReducer) => {
  return {
    type: 'tasks/setTasksState',
    payload: state,
  };
};
