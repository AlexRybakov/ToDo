import { IStore } from '..';

export const selectModalVisible = (state: IStore) => state.modalReducer.visible;
export const selectModalContent = (state: IStore) => state.modalReducer.content;
