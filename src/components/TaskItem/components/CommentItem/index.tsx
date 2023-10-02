import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getCommentsQuantity from '../../../../services/getCommentsQuantity';
import returnNormalizeDate from '../../../../services/getNormalizeDate';
import { setTasksAction } from '../../../../store/tasks/actions';
import { IComment, ITask } from '../../../../types/ITasks';
import './styles.scss';

const CommentItem = ({
  comment,
  task,
  tasks,
}: {
  comment: IComment;
  task: ITask;
  tasks: ITask[];
}) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [subCommentVisible, setSubCommentVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const passedTime = Math.floor(
    (+new Date() - +new Date(comment.creatingDate)) / 1000
  );

  const addSubComment = () => {
    if (commentText) {
      const commentItem = {
        id: getCommentsQuantity(task) + 1,
        creatingDate:
          new Date().toDateString() + ' ' + new Date().toTimeString(),
        text: commentText,
        includeComments: [],
      };

      comment.includeComments.push(commentItem);
      setCommentText('');
      dispatch(setTasksAction(tasks));
      setReplyVisible(false);
      setSubCommentVisible(true);
    } else alert('Введите комментарий перед отправкой');
  };

  return (
    <div className='comment-item'>
      <section className='comment-item__header'>
        <p className='comment-item__id'>
          Комментарий #{comment.id}, Опубликован{' '}
          {returnNormalizeDate(passedTime)} назад
        </p>
      </section>
      <main>{comment.text}</main>
      <section className='comment-item__footer'>
        <p
          className='comment-item__fotter__reply'
          onClick={() => setReplyVisible(!replyVisible)}
        >
          Ответить
        </p>
        <p
          className='comment-item__fotter__sub-comments'
          onClick={() => setSubCommentVisible(!subCommentVisible)}
        >{`Ответов (${getCommentsQuantity(comment)})`}</p>
      </section>
      {replyVisible && (
        <div className='task-detail__input-comment'>
          <textarea
            className='task-detail__input-comment__area'
            placeholder={'Ответить к комментарию#' + comment.id}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          {commentText && (
            <button
              className='task-detail__input-comment__send-button'
              onClick={() => addSubComment()}
            >
              Отправить
            </button>
          )}
        </div>
      )}
      {subCommentVisible && (
        <section className='comment-item__subcomments'>
          {comment.includeComments.map((subComment) => (
            <CommentItem
              comment={subComment}
              task={task}
              tasks={tasks}
              key={subComment.id}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default CommentItem;
