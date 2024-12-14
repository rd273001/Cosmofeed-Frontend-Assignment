import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../types/modal';

const initialState = {
  isAddTaskModalVisible: false,
  isEditModalVisible: false,
  isViewTaskModalVisible: false,
  isConfirmDeleteModalVisible: false,
  isToggleTaskAsDoneModalVisible: false,
  isToggleTaskAsPendingModalVisible: false,
  isConfirmBulkMarkAsDoneModalVisible: false,
  isConfirmBulkMarkAsPendingModalVisible: false,
  isConfirmBulkDeleteModalVisible: false,
  isConfirmCancelModalVisible: false,
  isConfirmSaveModalVisible: false,
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
        case 'EditTask':
          state.isEditModalVisible = !state.isEditModalVisible;
          break;
        case 'ViewTask':
          state.isViewTaskModalVisible = !state.isViewTaskModalVisible;
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
        case 'ConfirmCancel':
          state.isConfirmCancelModalVisible = !state.isConfirmCancelModalVisible;
          break;
        case 'ConfirmSave':
          state.isConfirmSaveModalVisible = !state.isConfirmSaveModalVisible;
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