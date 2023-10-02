import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import ProjectsPage from '../../pages/projectsPage';
import TasksPage from '../../pages/TasksPage';
import { selectModalVisible } from '../../store/modal/selectors';
import Modal from '../Modal';
import './styles.scss';

const AppContent = () => {
  const isModalVisible = useSelector(selectModalVisible);

  const routes = useRoutes([
    {
      path: '/projects',
      children: [
        {
          path: '',
          element: <ProjectsPage />,
        },
        {
          path: '/projects/:id',
          element: <TasksPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={'/projects'} />,
    },
  ]);

  return (
    <div className='app-content'>
      {isModalVisible && <Modal />}
      {routes}
    </div>
  );
};

export default AppContent;
