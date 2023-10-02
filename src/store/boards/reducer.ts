import boardsTemplate from '../../fixtures/boardsTemplate';
import { IBoardAction, IBoardsReducer } from './types';

const initialState = {
  boards: [...boardsTemplate],
  activeBoardId: 0,
  mobileBoard: 0,
};

const boardsReducer = (
  state: IBoardsReducer = initialState,
  action: IBoardAction
) => {
  switch (action.type) {
    case 'boards/setActiveBoardId':
      return { ...state, activeBoardId: action.payload };
    case 'boards/addTasksToBoards':
      return { ...state, boards: action.payload };
    default:
      return state;
  }
};

export default boardsReducer;
