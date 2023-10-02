import { IStore } from '..';

export const selectActiveTask = (state: IStore) =>
  state.tasksReducer.activeTask;
export const selectCurrentId = (state: IStore) => state.tasksReducer.currentId;
export const selectTasks = (state: IStore) => state.tasksReducer.tasks;
export const selectTasksStore = (state: IStore) => state.tasksReducer;
