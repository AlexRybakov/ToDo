import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addContentModalAction, showModalAction } from '../store/modal/actions';

const useShowModal = () => {
  const dispatch = useDispatch();
  return (
    content: JSX.Element,
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    target.ownerDocument.body.classList.add('scroll-hide');
    dispatch(showModalAction(true));
    dispatch(addContentModalAction(content));
  };
};

export default useShowModal;
