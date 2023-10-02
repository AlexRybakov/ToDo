import React from 'react';
import { IModalAction } from './types';

const initialState = {
  visible: false,
  content: React.createElement('div', null, 'modalContent'),
};

const modalReducer = (
  state = initialState,
  action: IModalAction<boolean | JSX.Element>
) => {
  switch (action.type) {
    case 'modal/show':
      return action.payload
        ? { ...state, visible: action.payload }
        : { ...state, visible: action.payload, content: null };
    case 'modal/content':
      return { ...state, content: action.payload };

    default:
      return state;
  }
};

export default modalReducer;
