import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import useShowModal from '../../hooks/useShowModal';
import { getCutsString } from '../../services/getCutsString';
import { selectTasks } from '../../store/tasks/selector';
import { ITask } from '../../types/ITasks';
import TaskDetail from '../TaskItem/components/TaskDetail';
import './styles.scss';

const SearchTask = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams, setSearchParams] = useState('id');
  const [searchResult, setSearchResult] = useState([] as ITask[]);
  const [isSearching, setIsSearching] = useState(false);
  const copyTasks = useSelector(selectTasks).slice(0);
  const showModal = useShowModal();

  const getTasksArray = (
    mainTasksArray: ITask[],
    openTasksArray: ITask[] = []
  ) => {
    mainTasksArray.forEach((task) => {
      openTasksArray.push(task);
      task.includeTask.length > 0 &&
        getTasksArray(task.includeTask, openTasksArray);
    });

    return openTasksArray;
  };

  const allTasksArr = getTasksArray(copyTasks);

  const setActiveClass = (param: string) =>
    param === searchParams ? 'active' : '';

  const setActiveParams = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const eventTarget = e.target as HTMLParagraphElement;
    eventTarget.dataset.parametr &&
      setSearchParams(eventTarget.dataset.parametr);
  };

  const searchTask = () => {
    const result = allTasksArr.filter((task) => {
      let taskItem;
      if (searchParams === 'id') taskItem = task.id.toString();
      else if (searchParams === 'title') taskItem = task.title;
      else taskItem = task.description;

      const result = taskItem.toUpperCase().indexOf(searchValue.toUpperCase());

      if (result !== -1) {
        return task;
      } else return null;
    });
    setIsSearching(true);
    setSearchResult(result);
  };

  return (
    <div className='search-task'>
      <h1 className='search-task__title'>Поиск задачи</h1>
      <section className='search-task__search'>
        <section
          className='search-task__search-params'
          onClick={(e) => setActiveParams(e)}
        >
          <p
            className={`search-task__input-title ${setActiveClass('id')}`}
            data-parametr='id'
          >
            Поиск по id
          </p>
          <p
            className={`search-task__input-title ${setActiveClass('title')}`}
            data-parametr='title'
          >
            Поиск по названию
          </p>
          <p
            className={`search-task__input-title ${setActiveClass(
              'description'
            )}`}
            data-parametr='description'
          >
            Поиск по описанию
          </p>
        </section>
        <input
          type='text'
          className='search-task__input'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className='search-task__button' onClick={() => searchTask()}>
          <span className='icon-search' />
        </button>
      </section>
      <section className='search-task__found-tasks'>
        {searchResult.length > 0
          ? searchResult.map((task) => (
              <div
                className='search-task__found-task'
                key={task.id}
                onClick={(e) =>
                  showModal(<TaskDetail task={task} tasksArr={copyTasks} />, e)
                }
              >
                <h4 className='search-task__found-task__title'>
                  {task.title}, id#{task.id}
                </h4>
                <p className='search-task__found-task__description'>
                  {getCutsString(task.description, 150)}
                </p>
              </div>
            ))
          : isSearching && <h4>Такая задача не найдена :(</h4>}
      </section>
    </div>
  );
};

export default SearchTask;
