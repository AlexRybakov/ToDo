import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCloseModal from '../../hooks/useCloseModal';
import Project from '../../services/createProject';
import {
  addProjectAction,
  setActiveProjectAction,
} from '../../store/projects/actions';
import { selectProjects } from '../../store/projects/selector';
import './styles.scss';

const AddProject = () => {
  const projects = useSelector(selectProjects);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const closeModal = useCloseModal();

  const addProjectHandler = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    if (title && description) {
      const project = new Project(projects.projects.length, title, description);
      dispatch(addProjectAction(project));
      dispatch(setActiveProjectAction(project));
      closeModal(e);
    } else alert('Пожалуйста заполните все поля');
  };

  return (
    <div className='new-project__form'>
      <h2>Создать новый проект</h2>
      <p className='new-project__form__description'>Название</p>
      <input
        type='text'
        className='new-project__title'
        placeholder='Введите название проекта'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='new-project__form__description'>Описание</p>
      <textarea
        className='new-project__form__project-text'
        placeholder='Введите описание проекта'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className='new-project__add-project-button'
        onClick={(e) => addProjectHandler(e)}
      >
        Создать проект
      </button>
    </div>
  );
};

export default AddProject;
