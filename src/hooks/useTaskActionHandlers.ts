import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Task } from '../types/task';
import { addTask, deleteTask, updateTask } from '../store/task/asyncThunks';
import { setSearchTerm, toggleTaskState } from '../store/task/taskSlice';

const useTaskActionHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    tasks,
    searchTerm,
  } = useSelector( ( state: RootState ) => state.tasks );

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

  const handleAddTask = useCallback( ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> ) => {
    dispatch( addTask( task ) );
  }, [dispatch] );

  const handleUpdateTask = useCallback( ( task: Task ) => {
    dispatch( updateTask( task ) );
  }, [dispatch] );

  const handleDeleteTask = useCallback( ( taskId: string ) => {
    dispatch( deleteTask( taskId ) );
  }, [dispatch] );

  const handleToggleTaskState = useCallback( ( taskId: string ) => {
    dispatch( toggleTaskState( taskId ) );
  }, [dispatch] );

  const handleSearchTasks = useCallback( ( term: string ) => {
    dispatch( setSearchTerm( term ) );
  }, [dispatch] );

  return {
    tasks: filteredAndSortedTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleTaskState,
    handleSearchTasks,
  };
};

export default useTaskActionHandlers;