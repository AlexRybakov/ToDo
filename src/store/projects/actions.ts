import { IProject } from '../../types/IProject';
import { IProjectReducer } from './types';

export const addProjectAction = (project: IProject) => {
  return {
    type: 'projects/addProject',
    payload: project,
  };
};

export const setActiveProjectAction = (project: IProject) => {
  return {
    type: 'projects/setActiveProject',
    payload: project,
  };
};
export const setProjectsAction = (projects: IProjectReducer) => {
  return {
    type: 'projects/setProjects',
    payload: projects,
  };
};
