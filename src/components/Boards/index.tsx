import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTasksToBoardsAction,
  setActiveBoardIdAction,
} from '../../store/boards/actions';
import { selectActiveBoard, selectBoards } from '../../store/boards/selector';
import { selectTasksStore } from '../../store/tasks/selector';
import AddTask from '../AddTask';
import BoardItem from '../BoardItem';
import './styles.scss';
import SearchTask from '../SearchTask';
import { selectProjects } from '../../store/projects/selector';
import { NavLink } from 'react-router-dom';
import useShowModal from '../../hooks/useShowModal';

const Boards = () => {
  const dispatch = useDispatch();
  const showModal = useShowModal();
  const activeBoard = useSelector(selectActiveBoard);
  const boards = useSelector(selectBoards);
  const tasksState = useSelector(selectTasksStore);
  const projects = useSelector(selectProjects);

  const copyTasks = tasksState.tasks.slice(0);

  projects.activeProject.tasksState = tasksState;

  useEffect(() => {
    dispatch(addTasksToBoardsAction(copyTasks));
    localStorage.setItem('todo-app__ver4', JSON.stringify(projects));
    // eslint-disable-next-line
  }, [tasksState]);

  const openAddTaskWindow = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    showModal(<AddTask targetTasks={copyTasks} mainTasks={copyTasks} />, e);
  };

  const checkActive = (id: number) => (id === +activeBoard ? 'active' : '');

  const changeActiveBoard = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLSpanElement;
    target.dataset.id &&
      +target.dataset.id !== activeBoard &&
      dispatch(setActiveBoardIdAction(+target.dataset.id));
  };

  return (
    <div className='boards-wrapper'>
      <div className='boards__menu'>
        <h1 className='boards__menu__title'>{projects.activeProject.title}</h1>
        <div className='boards__menu__buttons'>
          <button
            className='boards__menu__button'
            onClick={(e) => openAddTaskWindow(e)}
          >
            Создать задачу
          </button>
          <button
            className='boards__menu__button'
            onClick={(e) => showModal(<SearchTask />, e)}
          >
            Поиск задачи
          </button>
          <NavLink to='/projects' className='boards__menu__button'>
            Вернуться к проектам
          </NavLink>
        </div>
      </div>
      <div className='boards__items'>
        <div
          className='boards__menu-mobile'
          onClick={(e) => changeActiveBoard(e)}
        >
          {boards.map((board) => (
            <span
              className={`boards__menu-mobile__title ${checkActive(board.id)}`}
              data-id={board.id}
              key={board.id}
            >
              {board.title}
            </span>
          ))}
        </div>
        {boards.map((board) => {
          return <BoardItem boardElem={board} key={board.id} />;
        })}
      </div>
    </div>
  );
};

export default Boards;
