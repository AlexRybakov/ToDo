import { IStore } from '..';

export const selectActiveProject = (state: IStore) =>
  state.projectsReducer.activeProject;
export const selectProjects = (state: IStore) => state.projectsReducer;
