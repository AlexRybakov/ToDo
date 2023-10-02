import { combineReducers, legacy_createStore as createStore } from 'redux';
import boardsReducer from './boards/reducer';
import { IBoardsReducer } from './boards/types';
import modalReducer from './modal/reducer';
import { IModalReducer } from './modal/types';
import projectsReducer from './projects/reducer';
import { IProjectReducer } from './projects/types';
import tasksReducer from './tasks/reducer';
import { ITasksReducer } from './tasks/types';

export interface IStore {
  tasksReducer: ITasksReducer;
  boardsReducer: IBoardsReducer;
  modalReducer: IModalReducer;
  projectsReducer: IProjectReducer;
}

const rootReducer = combineReducers({
  tasksReducer,
  boardsReducer,
  modalReducer,
  projectsReducer,
});

const store = createStore(rootReducer);

export default store;
