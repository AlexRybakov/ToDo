import { IComment } from '../types/ITasks';

const getCommentsQuantity = (
  commentParent: { includeComments: IComment[] },
  commentArr: IComment[] = []
) => {
  commentParent.includeComments.forEach((comment) => {
    commentArr.push(comment);
    comment.includeComments.length > 0 &&
      getCommentsQuantity(comment, commentArr);
  });

  return commentArr.length;
};

export default getCommentsQuantity;
