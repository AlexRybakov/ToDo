import { IStore } from '..';

export const selectActiveBoard = (state: IStore) =>
  state.boardsReducer.activeBoardId;
export const selectBoards = (state: IStore) => state.boardsReducer.boards;
