import { useSelector } from 'react-redux';
import { selectModalContent } from '../../store/modal/selectors';
import closeIcon from '../../assets/img/icons/close-button.png';
import './style.scss';

import { MouseEvent } from 'react';
import useCloseModal from '../../hooks/useCloseModal';

const Modal = () => {
  const closeModal = useCloseModal();
  const content = useSelector(selectModalContent);

  const clickOutside = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (
      target.className === 'modal-window' ||
      target.className === 'closeIcon' ||
      target.className === 'modal__content-wrapper'
    ) {
      closeModal(e);
    }
  };

  return (
    <div className='modal-window' onClick={(e) => clickOutside(e)}>
      <div className='modal__content-wrapper'>
        <div className='modal__content-container'>{content}</div>
        <img src={closeIcon} className='closeIcon' alt='close' />
      </div>
    </div>
  );
};

export default Modal;
