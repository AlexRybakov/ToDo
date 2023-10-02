import { IBoard } from '../../types/IBoards';
import { ITask } from '../../types/ITasks';

export interface IBoardAction {
  type: string;
  payload: ITask;
}

export interface IBoardsReducer {
  boards: IBoard[];
  activeBoardId: number;
}
