import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Task } from '../types/task';
import { addTask, deleteTask, updateTask } from '../store/task/asyncThunks';
import { setSearchTerm, setSelectedTask, toggleTaskState } from '../store/task/taskSlice';
import { ModalType } from '../types/modal';


const useTaskActionHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, searchTerm, loading, selectedTask } = useSelector( ( state: RootState ) => state.tasks );

  const filteredAndSortedTasks = useMemo( () => {
    let processedTasks = [...tasks];

    // Search filtering
    if ( searchTerm ) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      processedTasks = processedTasks.filter( task =>
        task.title.toLowerCase().includes( lowerSearchTerm ) ||
        task.description.toLowerCase().includes( lowerSearchTerm )
      );
    }

    // TO DO - Sorting

    // TO DO - Group By

    return processedTasks;
  }, [tasks, searchTerm] );

  const handleAddTask = useCallback( ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'>, onClose?: ( modalType: ModalType ) => void ) => {
    dispatch( addTask( task ) );
    onClose?.( 'AddTask' );
  }, [dispatch] );

  const handleUpdateTask = useCallback( ( task: Task, onClose?: ( modalType: ModalType ) => void ) => {
    dispatch( updateTask( task ) );
    onClose?.( 'EditTask' );
  }, [dispatch] );

  const handleDeleteTask = useCallback( ( taskId: string, onClose?: ( modalType: ModalType ) => void ) => {
    dispatch( deleteTask( taskId ) );
    onClose?.( 'ConfirmDelete' );
  }, [dispatch] );

  const handleSelectedTask = useCallback( ( task: Task ) => {
    dispatch( setSelectedTask( task ) );
  }, [dispatch] );

  const handleToggleTaskState = useCallback( ( taskId: string ) => {
    dispatch( toggleTaskState( taskId ) );
  }, [dispatch] );

  const handleSearchTasks = useCallback( ( term: string ) => {
    dispatch( setSearchTerm( term ) );
  }, [dispatch] );

  return {
    tasks: filteredAndSortedTasks,
    selectedTask,
    loading,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleSelectedTask,
    handleToggleTaskState,
    handleSearchTasks,
  };
};

export default useTaskActionHandlers;