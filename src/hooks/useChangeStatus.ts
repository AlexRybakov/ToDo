import { useDispatch } from 'react-redux';
import { setTasksAction } from '../store/tasks/actions';
import { ITask } from '../types/ITasks';

const useChangeStatus = () => {
  const dispatch = useDispatch();

  const checkUndoneSubtasks = (task: ITask) => {
    let unDoneTasks = 0;
    if (task.includeTask.length > 0) {
      task.includeTask.forEach((subTask) => {
        subTask.status !== 'done' && unDoneTasks++;
      });
    }
    return unDoneTasks;
  };

  return (newStatus: string, task: ITask, tasks: ITask[]) => {
    if (newStatus === 'done') {
      if (checkUndoneSubtasks(task) > 0) {
        alert('Сперва выполните все подзадачи');
      } else {
        task.status = newStatus;
        task.endDate =
          new Date().toDateString() + ' ' + new Date().toTimeString();
        dispatch(setTasksAction(tasks));
      }
    } else if (newStatus === 'development') {
      task.startDevDate =
        new Date().toDateString() + ' ' + new Date().toTimeString();
      task.endDate = '';
      task.status = newStatus;
      dispatch(setTasksAction(tasks));
    } else {
      task.status = newStatus;
      dispatch(setTasksAction(tasks));
    }
  };
};

export default useChangeStatus;
