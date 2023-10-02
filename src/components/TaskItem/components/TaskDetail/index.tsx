import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getCommentsQuantity from '../../../../services/getCommentsQuantity';
import { setTasksAction } from '../../../../store/tasks/actions';
import { ITask } from '../../../../types/ITasks';
import CommentItem from '../CommentItem';
import TaskContent from '../TaskContent';
import './styles.scss';

const TaskDetail = ({ task, tasksArr }: { task: ITask; tasksArr: ITask[] }) => {
  const [commentText, setCommentText] = useState('');

  const submitComment = () => {
    if (commentText) {
      const commentItem = {
        id: getCommentsQuantity(task) + 1,
        creatingDate:
          new Date().toDateString() + ' ' + new Date().toTimeString(),
        text: commentText,
        includeComments: [],
      };
      task.includeComments.push(commentItem);
      dispatch(setTasksAction(tasksArr));
      setCommentText('');
    } else alert('Пожалуйста введите комментарий перед отправкой');
  };

  const dispatch = useDispatch();

  return (
    <div className='task-detail'>
      <TaskContent task={task} taskArr={tasksArr} />
      <div className='task-detail__input-comment'>
        <textarea
          className='task-detail__input-comment__area'
          placeholder='Оставить комментарий'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        {commentText && (
          <button
            className='task-detail__input-comment__send-button'
            onClick={() => submitComment()}
          >
            Отправить
          </button>
        )}
      </div>
      {task.includeComments.map((comment) => (
        <CommentItem
          comment={comment}
          task={task}
          tasks={tasksArr}
          key={comment.id}
        />
      ))}
    </div>
  );
};

export default TaskDetail;
