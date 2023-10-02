import { ITask } from '../../types/ITasks';

export const setActiveBoardIdAction = (id: number) => {
  return {
    type: 'boards/setActiveBoardId',
    payload: id,
  };
};

export const addTasksToBoardsAction = (tasks: ITask[]) => {
  const boards = [
    { id: 0, title: 'queue', tasks: [] as ITask[] },
    { id: 1, title: 'development', tasks: [] as ITask[] },
    { id: 2, title: 'done', tasks: [] as ITask[] },
  ];

  boards.forEach((board) => {
    tasks.forEach((task) => {
      if (task.status === board.title) {
        if (board.tasks.findIndex((item) => item === task) === -1) {
          board.tasks.push(task);
        }
      }
    });
  });

  return {
    type: 'boards/addTasksToBoards',
    payload: boards,
  };
};
