import { mockProject } from '../../fixtures/mockProject';
import { IProjectAction } from './types';

const localStorageData = localStorage.getItem('todo-app__ver4');

const checkLocalStorageData = (localData: string | null) => {
  const initialState = {
    activeProject: mockProject,
    projects: [mockProject],
  };

  if (typeof localData === 'string') {
    if (JSON.parse(localData).activeProject && JSON.parse(localData).projects) {
      return JSON.parse(localData);
    } else return initialState;
  } else return initialState;
};

const projectsReducer = (
  state = checkLocalStorageData(localStorageData),
  action: IProjectAction
) => {
  switch (action.type) {
    case 'projects/addProject':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'projects/setActiveProject':
      return { ...state, activeProject: action.payload };
    case 'projects/setProjects':
      return action.payload;
    default:
      return state;
  }
};

export default projectsReducer;
