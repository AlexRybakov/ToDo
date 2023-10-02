export interface IModalAction<T> {
  type: string;
  payload: T;
}

export interface IModalReducer {
  visible: boolean;
  content: JSX.Element;
}
