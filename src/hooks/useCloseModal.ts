import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { showModalAction } from '../store/modal/actions';

const useCloseModal = () => {
  const dispatch = useDispatch();
  return (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const target = e.target as HTMLElement;
    target.ownerDocument.body.classList.remove('scroll-hide');
    dispatch(showModalAction(false));
  };
};

export default useCloseModal;
