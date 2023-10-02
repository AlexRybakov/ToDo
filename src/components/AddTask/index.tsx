import { DragEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddTasksAction } from '../../store/tasks/actions';
import { selectCurrentId } from '../../store/tasks/selector';
import Task from '../../services/createTask';
import './styles.scss';
import { ITask } from '../../types/ITasks';
import useCloseModal from '../../hooks/useCloseModal';

const AddTask = ({
  targetTasks,
  mainTasks,
}: {
  targetTasks: ITask[];
  mainTasks: ITask[];
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([] as File[]);
  const currentId = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const closeModal = useCloseModal();

  const addTask = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (title && description) {
      const newTask = new Task(
        currentId,
        title,
        description,
        priority,
        deadline,
        files
      );
      targetTasks.push(newTask);
      dispatch(setAddTasksAction(mainTasks));
      setTitle('');
      setDescription('');
      setDeadline('');
      setFiles([] as File[]);
      closeModal(e);
    } else alert('Пожалуйста заполните название и описание');
  };

  const dragStartHanlder = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    let drops = [...e.dataTransfer.files];
    setFiles([...files, ...drops]);
    setDrag(false);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  return (
    <div className='new-task__form'>
      <h2>Создание новой задачи</h2>
      <p className='new-task__form__description'>Название</p>
      <input
        type='text'
        className='new-task__title'
        placeholder='Введите название'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='new-task__form__description'>Описание</p>
      <textarea
        className='new-task__form__task-text'
        placeholder='Введите описание'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p className='new-task__form__description'>Приоритет</p>
      <select
        className='new-task__priority'
        onChange={(e) => setPriority(e.target.value)}
      >
        <option id='1'>Low</option>
        <option id='2'>Medium</option>
        <option id='3'>High</option>
      </select>
      <p className='new-task__form__description'>Дедлайн</p>
      <input
        className='new-task__deadline'
        type='datetime-local'
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <p className='new-task__form__description'>Загруженные файлы</p>
      <section
        className='new-task__form__file-upload'
        draggable={true}
        onDrop={(e) => dropHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHanlder(e)}
        onDragOver={(e) => dragStartHanlder(e)}
      >
        {drag ? (
          <div className='new-task__form__file-upload__drop-area'>
            Отпустите для загрузки
          </div>
        ) : (
          <div>Перетащите файлы для загрузки</div>
        )}
      </section>
      <button className='new-task__add-task-button' onClick={(e) => addTask(e)}>
        Создать задачу
      </button>
    </div>
  );
};

export default AddTask;
