import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { toggleModalVisibility } from '../store/modal/modalSlice';
import { ModalType } from '../types/modal';


const useModalVisibilityHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isViewTaskModalVisible,
    isEditModalVisible,
    isConfirmDeleteModalVisible,
    isAddTaskModalVisible,
    isToggleTaskAsDoneModalVisible,
    isToggleTaskAsPendingModalVisible,
    isConfirmBulkMarkAsDoneModalVisible,
    isConfirmBulkMarkAsPendingModalVisible,
    isConfirmBulkDeleteModalVisible
  } = useSelector( ( state: RootState ) => state.modals );

  const handleToggleModalVisibility = useCallback( ( modalName: ModalType ) => {
    dispatch( toggleModalVisibility( modalName ) );
  }, [dispatch] );

  return {
    isViewTaskModalVisible,
    isEditModalVisible,
    isConfirmDeleteModalVisible,
    isAddTaskModalVisible,
    isToggleTaskAsDoneModalVisible,
    isToggleTaskAsPendingModalVisible,
    isConfirmBulkMarkAsDoneModalVisible,
    isConfirmBulkMarkAsPendingModalVisible,
    isConfirmBulkDeleteModalVisible,
    handleToggleModalVisibility,
  };
};

export default useModalVisibilityHandlers;