import { IProject } from '../../types/IProject';

export interface IProjectAction {
  type: string;
  payload: IProject;
}

export interface IProjectReducer {
  activeProject: IProject;
  projects: IProject[];
}
