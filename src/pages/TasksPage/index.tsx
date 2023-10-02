import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Boards from '../../components/Boards';
import { selectProjects } from '../../store/projects/selector';
import { setTasksStateAction } from '../../store/tasks/actions';
import { initialState } from '../../store/tasks/reducer';

import './styles.scss';

const TasksPage = () => {
  const dispatch = useDispatch();
  const activeProject = JSON.parse(
    JSON.stringify(useSelector(selectProjects).activeProject.tasksState)
  );
  const currentState = activeProject.currentId ? activeProject : initialState;

  useEffect(() => {
    dispatch(setTasksStateAction(currentState));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='tasks-page'>
      <Boards />
    </div>
  );
};

export default TasksPage;
