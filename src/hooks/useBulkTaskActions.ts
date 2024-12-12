import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Task } from '../types/task';
import { setSelectedTasksIds, clearSelectedTasksIds, toggleBulkTaskSelection } from '../store/task/taskSlice';
import { toggleModalVisibility } from '../store/modal/modalSlice';
import { bulkDeleteTask, bulkToggleTaskState } from '../store/task/asyncThunks';

const useBulkTaskActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedTasksIds } = useSelector( ( state: RootState ) => state.tasks );

  const handleSelectAllTasks = useCallback( ( tasks: Task[] ) => {
    dispatch( setSelectedTasksIds( tasks.map( task => task.id ) ) );
  }, [dispatch] );

  const handleClearSelectedTasks = useCallback( () => {
    dispatch( clearSelectedTasksIds() );
  }, [dispatch] );

  const handleToggleBulkTaskSelection = useCallback( ( taskId: string ) => {
    dispatch( toggleBulkTaskSelection( taskId ) );
  }, [dispatch] );

  const handleBulkMarkAsDone = useCallback( () => {
    dispatch( bulkToggleTaskState( {
      taskIds: selectedTasksIds,
      taskState: true
    } ) );
    dispatch( toggleModalVisibility( 'ConfirmBulkMarkAsDone' ) );
  }, [dispatch, selectedTasksIds] );

  const handleBulkMarkAsPending = useCallback( () => {
    dispatch( bulkToggleTaskState( {
      taskIds: selectedTasksIds,
      taskState: false
    } ) );
    dispatch( toggleModalVisibility( 'ConfirmBulkMarkAsPending' ) );
  }, [dispatch, selectedTasksIds] );

  const handleBulkDelete = useCallback( () => {
    dispatch( bulkDeleteTask( selectedTasksIds ) );
    dispatch( toggleModalVisibility( 'ConfirmBulkDelete' ) );
  }, [dispatch, selectedTasksIds] );

  return {
    selectedTasksIds,
    handleSelectAllTasks,
    handleClearSelectedTasks,
    handleToggleBulkTaskSelection,
    handleBulkMarkAsDone,
    handleBulkMarkAsPending,
    handleBulkDelete,
  };
};

export default useBulkTaskActions;