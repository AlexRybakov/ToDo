import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddProject from '../../components/AddProject';
import useShowModal from '../../hooks/useShowModal';
import { setActiveProjectAction } from '../../store/projects/actions';
import { selectProjects } from '../../store/projects/selector';
import { IProject } from '../../types/IProject';
import './styles.scss';

const ProjectsPage = () => {
  const showModal = useShowModal();
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);

  const createProject = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    showModal(<AddProject />, e);
  };
  const setActiveProjectHandler = (project: IProject) => {
    dispatch(setActiveProjectAction(project));
  };

  localStorage.setItem('todo-app__ver4', JSON.stringify(projects));

  return (
    <div className='project-page'>
      <div className='project-wrapper'>
        <h1 className='project-page__title'>TODO-приложение</h1>
        <h2 className='project-page__title'>Выберите свой проект</h2>
        <div className='project-page__projects'>
          {projects.projects.map((project) => {
            return (
              <NavLink
                to={`/projects/project-${project.title}`}
                className='project-page__project-item'
                key={project.id}
                onClick={() => setActiveProjectHandler(project)}
              >
                #{project.id}. {project.title}
              </NavLink>
            );
          })}
        </div>
        <button
          className='project-page__create-button'
          onClick={(e) => createProject(e)}
        >
          Создать новый проект
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
