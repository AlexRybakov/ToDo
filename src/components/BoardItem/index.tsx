import { DragEvent } from 'react';
import { IBoard } from '../../types/IBoards';
import useChangeStatus from '../../hooks/useChangeStatus';
import TaskItem from '../TaskItem/TaskItem';
import './styles.scss';
import { useSelector } from 'react-redux';
import { selectActiveTask, selectTasks } from '../../store/tasks/selector';
import { selectActiveBoard } from '../../store/boards/selector';

const BoardItem = ({ boardElem }: { boardElem: IBoard }) => {
  const activeTask = useSelector(selectActiveTask);
  const tasksCopy = useSelector(selectTasks).slice(0);
  const activeBoard = useSelector(selectActiveBoard);

  const moveTask = useChangeStatus();

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDropHadler = (e: DragEvent<HTMLDivElement>) => {
    moveTask(boardElem.title, activeTask, tasksCopy);
  };

  const sortTasks = (board: IBoard) => {
    switch (board.title) {
      case 'development':
        return board.tasks.sort(
          (elem1, elem2) =>
            +new Date(elem1.startDevDate ? elem1.startDevDate : '') -
            +new Date(elem2.startDevDate ? elem2.startDevDate : '')
        );
      case 'done':
        return board.tasks.sort((elem1, elem2) => {
          return (
            +new Date(elem1.endDate ? elem1.endDate : '') -
            +new Date(elem2.endDate ? elem2.endDate : '')
          );
        });
      default:
        return board.tasks.sort((elem1, elem2) => elem1.id - elem2.id);
    }
  };

  const checkActive = () =>
    boardElem.id === +activeBoard ? 'active' : 'unactive';

  return (
    <div
      className={`board ${checkActive()}`}
      onDrop={(e) => onDropHadler(e)}
      onDragOver={(e) => onDragOver(e)}
    >
      <h1 className='board__title'>{boardElem.title}</h1>
      {sortTasks(boardElem).map((taskElem) => {
        return <TaskItem task={taskElem} board={boardElem} key={taskElem.id} />;
      })}
    </div>
  );
};

export default BoardItem;
