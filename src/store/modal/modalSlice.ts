import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../types/modal';

const initialState = {
  isViewTaskModalVisible: false,
  isEditModalVisible: false,
  isConfirmDeleteModalVisible: false,
  isAddTaskModalVisible: false,
};

const taskSlice = createSlice( {
  name: 'tasks',
  initialState,
  reducers: {
    toggleModalVisibility: ( state, action: PayloadAction<ModalType> ) => {
      switch ( action.payload ) {
        case 'AddTask':
          state.isAddTaskModalVisible = !state.isAddTaskModalVisible;
          break;
        case 'ViewTask':
          state.isViewTaskModalVisible = !state.isViewTaskModalVisible;
          break;
        case 'EditTask':
          state.isEditModalVisible = !state.isEditModalVisible;
          break;
        case 'ConfirmDelete':
          state.isConfirmDeleteModalVisible = !state.isConfirmDeleteModalVisible;
          break;
        default:
          return state;
      }
    },
  },
} );

export const {
  toggleModalVisibility,
} = taskSlice.actions;

export default taskSlice.reducer;