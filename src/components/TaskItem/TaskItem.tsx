import { DragEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveBoardIdAction } from '../../store/boards/actions';
import { setActiveTaskAction } from '../../store/tasks/actions';
import { selectTasks } from '../../store/tasks/selector';
import { IBoard } from '../../types/IBoards';
import { ITask } from '../../types/ITasks';
import './styles.scss';
import TaskContent from './components/TaskContent';
import TaskDetail from './components/TaskDetail';
import returnNormalizeDate from '../../services/getNormalizeDate';
import useShowModal from '../../hooks/useShowModal';

const TaskItem = ({
  task,
  board,
  isChild = false,
}: {
  task: ITask;
  board: IBoard;
  isChild?: boolean;
}) => {
  const tasks = useSelector(selectTasks);
  const copyTasks = [...tasks];
  const dispatch = useDispatch();
  const showModal = useShowModal();
  const [isFocused, setFocus] = useState(false);
  const focusedStyle = {
    backgroundColor: 'rgba(224, 255, 255)',
    boxShadow: '0px 0px 5px rgba(16, 24, 40, 0.7)',
  };

  const setDevDuration = () => {
    const taskStartDevDate = task.startDevDate ? task.startDevDate : '';

    switch (task.status) {
      case 'queue':
        return (task.devDuration = null);
      case 'development':
        const duration = Math.floor(
          (+new Date() - +new Date(taskStartDevDate)) / 1000
        );
        return (task.devDuration = returnNormalizeDate(duration));
    }
  };

  setDevDuration();

  const dragStartHadler = (e: DragEvent<HTMLDivElement>) => {
    dispatch(setActiveTaskAction(task));
    dispatch(setActiveBoardIdAction(board.id));
  };

  const showDetailTask = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    showModal(<TaskDetail task={task} tasksArr={copyTasks} />, e);
  };

  return (
    <div className='task-wrapper'>
      <div
        className={`task${isChild ? ' child' : ''}`}
        draggable={!isChild}
        onMouseMove={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        onClick={(e) => showDetailTask(e)}
        onDragStart={(e) => dragStartHadler(e)}
        style={isFocused ? focusedStyle : {}}
      >
        <TaskContent task={task} taskArr={copyTasks} focusStatus={isFocused} />
        {task.includeTask.length > 0 &&
          task.includeTask.map((subTask) => (
            <TaskItem
              task={subTask}
              board={board}
              isChild={true}
              key={subTask.id}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskItem;
