import { DragEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useCloseModal from '../../hooks/useCloseModal';
import { setTasksAction } from '../../store/tasks/actions';
import { ITask } from '../../types/ITasks';
import './styles.scss';

const EditTask = ({
  targetTask,
  mainTasks,
}: {
  targetTask: ITask;
  mainTasks: ITask[];
}) => {
  const [title, setTitle] = useState(targetTask.title);
  const [description, setDescription] = useState(targetTask.description);
  const [priority, setPriority] = useState(targetTask.priority);
  const [deadline, setDeadline] = useState(targetTask.endDate);
  const [drag, setDrag] = useState(false);
  const [uploadFiles, setUploadFiles] = useState(targetTask.includeFiles);
  const dispatch = useDispatch();
  const closeModal = useCloseModal();

  const priorityList = ['Low', 'Medium', 'High'];

  const checkActivePriority = (elemPriority: string) =>
    elemPriority === priority ? 'active-priority' : '';

  const changePriority = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const priorityItem = e.target as HTMLElement;
    setPriority(priorityItem.innerText);
  };

  const dragStartHanlder = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    let drops = [...e.dataTransfer.files];
    setUploadFiles([...uploadFiles, ...drops]);
    setDrag(false);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const setEditedTask = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (title && description) {
      targetTask.title = title;
      targetTask.description = description;
      targetTask.priority = priority;
      targetTask.endDate = deadline;
      targetTask.includeFiles = uploadFiles;
      dispatch(setTasksAction(mainTasks));
      closeModal(e);
    } else alert('Пожалуйста заполните название и описание');
  };

  return (
    <div className='edit-task-form'>
      <h1 className='edit-task-form__title'>{`Задача #${targetTask.id}`}</h1>
      <p className='edit-task-form__field__title'>Название</p>
      <input
        type='text'
        className='edit-task-form__field--task-title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='edit-task-form__field__title'>Описание</p>
      <textarea
        className='edit-task-form__field--task-description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p className='edit-task-form__field__title'>Приоритет</p>
      <section
        className='edit-task-form__field--task-priority'
        onClick={(e) => changePriority(e)}
      >
        {priorityList.map((priority, index) => (
          <span
            className={`edit-task-form__field--task-priority__item ${checkActivePriority(
              priority
            )}`}
            key={index}
          >
            {priority}
          </span>
        ))}
      </section>
      <p className='edit-task-form__field__title'>Дедлайн</p>
      <input
        type='datetime-local'
        className='edit-task-form__field--task-deadline'
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <p className='edit-task-form__field__title'>Загруженные файлы</p>
      <section
        className='edit-task__form__file-upload'
        draggable={true}
        onDrop={(e) => dropHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHanlder(e)}
        onDragOver={(e) => dragStartHanlder(e)}
      >
        {drag ? (
          <div className='edit-task__form__file-upload__drop-area'>
            Отпустите для загрузки
          </div>
        ) : (
          <div>Перетащите файлы для загрузки</div>
        )}
      </section>
      <span className='icon-link'>{` (${uploadFiles.length})`}</span>
      <button
        className='edit-task-form__save-button'
        onClick={(e) => setEditedTask(e)}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

export default EditTask;
