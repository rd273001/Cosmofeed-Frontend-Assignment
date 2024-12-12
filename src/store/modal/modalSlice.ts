import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../types/modal';

const initialState = {
  isViewTaskModalVisible: false,
  isEditModalVisible: false,
  isConfirmDeleteModalVisible: false,
  isAddTaskModalVisible: false,
  isToggleTaskAsDoneModalVisible: false,
  isToggleTaskAsPendingModalVisible: false,
  isConfirmBulkMarkAsDoneModalVisible: false,
  isConfirmBulkMarkAsPendingModalVisible: false,
  isConfirmBulkDeleteModalVisible: false,
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
        case 'ToggleTaskAsDone':
          state.isToggleTaskAsDoneModalVisible = !state.isToggleTaskAsDoneModalVisible;
          break;
        case 'ToggleTaskAsPending':
          state.isToggleTaskAsPendingModalVisible = !state.isToggleTaskAsPendingModalVisible;
          break;
        case 'ConfirmBulkMarkAsDone':
          state.isConfirmBulkMarkAsDoneModalVisible = !state.isConfirmBulkMarkAsDoneModalVisible;
          break;
        case 'ConfirmBulkMarkAsPending':
          state.isConfirmBulkMarkAsPendingModalVisible = !state.isConfirmBulkMarkAsPendingModalVisible;
          break;
        case 'ConfirmBulkDelete':
          state.isConfirmBulkDeleteModalVisible = !state.isConfirmBulkDeleteModalVisible;
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