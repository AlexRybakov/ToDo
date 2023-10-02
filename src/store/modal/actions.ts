export const showModalAction = (boolean: boolean) => {
  return {
    type: 'modal/show',
    payload: boolean,
  };
};

export const addContentModalAction = (content: JSX.Element) => {
  return {
    type: 'modal/content',
    payload: content,
  };
};
