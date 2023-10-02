import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import useChangeStatus from '../../../../hooks/useChangeStatus';
import { setTasksAction } from '../../../../store/tasks/actions';
import { selectTasks } from '../../../../store/tasks/selector';
import { ITask } from '../../../../types/ITasks';
import getCommentsQuantity from '../../../../services/getCommentsQuantity';
import { MouseEvent } from 'react';
import { selectModalVisible } from '../../../../store/modal/selectors';
import { showModalAction } from '../../../../store/modal/actions';
import EditTask from '../../../EditTask';
import AddTask from '../../../AddTask';
import useShowModal from '../../../../hooks/useShowModal';
import boardsTemplate from '../../../../fixtures/boardsTemplate';

const TaskContent = ({
  task,
  taskArr,
  focusStatus = true,
}: {
  task: ITask;
  taskArr: ITask[];
  focusStatus?: boolean;
}) => {
  const tasks = useSelector(selectTasks);
  const copyTasks = tasks.slice(0);
  const dispatch = useDispatch();
  const showModal = useShowModal();
  const changeStatus = useChangeStatus();
  const isModalVisible = useSelector(selectModalVisible);

  const printStatus = () => {
    switch (task.status) {
      case 'done':
        return 'Выполнено';
      case 'development':
        return `В работе ${task.devDuration}`;
      case 'queue':
        return 'Новая задача';
    }
  };

  const deleteTask = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    const findElem = (searchElem: ITask, arrOfElem: ITask[]) => {
      let taskIndex = arrOfElem.indexOf(searchElem);
      if (taskIndex !== -1) {
        arrOfElem.splice(taskIndex, 1);
      } else {
        arrOfElem.forEach((task) => {
          findElem(searchElem, task.includeTask);
        });
      }
    };
    findElem(task, copyTasks);
    dispatch(setTasksAction(copyTasks));
    isModalVisible && dispatch(showModalAction(false));
  };

  const addSubTask = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    showModal(
      <AddTask targetTasks={task.includeTask} mainTasks={taskArr} />,
      e
    );
  };

  const handleChangeTaskStatus = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    targetStatus: string
  ) => {
    e.stopPropagation();
    changeStatus(targetStatus, task, copyTasks);
    isModalVisible && dispatch(showModalAction(false));
  };

  const changeTask = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    showModal(<EditTask targetTask={task} mainTasks={taskArr} />, e);
  };

  const getNormalizeDate = (date: string) =>
    `${new Date(date).toLocaleDateString('RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })} в ${new Date(date).toLocaleTimeString('ru')}`;

  const deadLine = task.endDate ? task.endDate : '';

  return (
    <div className='task-content-wrapper'>
      <div className='task__header'>
        <h4 className='task__header__title'>{task.title}</h4>
        <section className='task__header__priority-and-status'>
          <span
            className={`task__priority-item ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
          <h6 className='task__status'>{printStatus()}</h6>
        </section>
      </div>
      <div className='task__main-info__wrapper'>
        <section className='task__dates-and-id'>
          <p className='task__id'>{`id: ${task.id}`}</p>
          <p className='task__date'>{`Создано ${getNormalizeDate(
            task.createDate
          )}`}</p>
          <p className='task__date'>
            {task.endDate
              ? `Дедлайн ${getNormalizeDate(deadLine)}`
              : 'Дедлайн отсутствует'}
          </p>
        </section>
        {focusStatus && (
          <section className='task__edit-buttons'>
            <span onClick={(e) => changeTask(e)} className='icon-edit' />
            <span onClick={(e) => deleteTask(e)} className='icon-bin' />
          </section>
        )}
      </div>
      <main className='task__description'>{task.description}</main>
      <div className='task__footer'>
        <section className='task__footer__icon-wrapper'>
          <span className='task__footer__chat-item icon-chat'>
            {getCommentsQuantity(task) ? getCommentsQuantity(task) : ''}
          </span>
        </section>
        <button className='task__footer--item' onClick={(e) => addSubTask(e)}>
          Добавить подзадачу
        </button>
        {boardsTemplate.map(
          (board) =>
            board.title.toUpperCase() !== task.status.toUpperCase() && (
              <button
                className='task__footer--item'
                onClick={(e) => handleChangeTaskStatus(e, board.title)}
                key={board.id}
              >
                to {board.title}
              </button>
            )
        )}
      </div>
    </div>
  );
};

export default TaskContent;
