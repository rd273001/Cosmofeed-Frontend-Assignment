import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Task } from '../types/task';
import { addTask, deleteTask, updateTask } from '../store/task/asyncThunks';
import { setSelectedTask, toggleTaskState, setSearchText, setGroupBy, setSorting } from '../store/task/taskSlice';
import { toggleModalVisibility } from '../store/modal/modalSlice';


const useTaskActionHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, selectedTask, searchText, sortColumn, sortDirection, groupBy } = useSelector( ( state: RootState ) => state.tasks );

  const filteredAndSortedTasks = useMemo( () => {
    let processedTasks = [...tasks];

    // Search filtering
    if ( searchText ) {
      const lowerSearchTerm = searchText.toLowerCase();
      processedTasks = processedTasks.filter( task =>
        task.title.toLowerCase().includes( lowerSearchTerm ) ||
        task.description.toLowerCase().includes( lowerSearchTerm )
      );
    }

    // Sorting
    if ( sortColumn ) {
      processedTasks.sort( ( a, b ) => {
        const valueA = a[sortColumn as keyof Task] as any;
        const valueB = b[sortColumn as keyof Task] as any;

        if ( valueA === undefined || valueB === undefined ) return 0;

        if ( typeof valueA === 'string' && typeof valueB === 'string' ) {
          return sortDirection === 'asc'
            ? valueA.localeCompare( valueB )
            : valueB.localeCompare( valueA );
        }

        // For date and numeric comparisons
        if ( valueA instanceof Date && valueB instanceof Date ) {
          return sortDirection === 'asc'
            ? valueA.getTime() - valueB.getTime()
            : valueB.getTime() - valueA.getTime();
        }

        return sortDirection === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      } );
    }

    // Grouping
    if ( groupBy ) {
      const groupMap: Record<string, Task[]> = {};
      processedTasks.forEach( task => {
        const groupKey = task[groupBy as keyof Task]?.toString() || 'Ungrouped';
        if ( !groupMap[groupKey] ) {
          groupMap[groupKey] = [];
        }
        groupMap[groupKey].push( task );
      } );
      return Object.values( groupMap );
    }

    return processedTasks;
  }, [tasks, searchText, sortColumn, sortDirection, groupBy] );

  const handleAddTask = useCallback( ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> ) => {
    dispatch( addTask( task ) );
    dispatch( toggleModalVisibility( 'AddTask' ) );
  }, [dispatch] );

  const handleUpdateTask = useCallback( ( task: Task ) => {
    dispatch( updateTask( task ) );
    dispatch( toggleModalVisibility( 'EditTask' ) );
  }, [dispatch] );

  const handleDeleteTask = useCallback( ( taskId: string ) => {
    dispatch( deleteTask( taskId ) );
    dispatch( toggleModalVisibility( 'ConfirmDelete' ) );
  }, [dispatch] );

  const handleSelectedTask = useCallback( ( task: Task ) => {
    dispatch( setSelectedTask( task ) );
  }, [dispatch] );

  const handleToggleTaskState = useCallback( ( taskId: string ) => {
    dispatch( toggleTaskState( taskId ) );
  }, [dispatch] );

  const handleSearchTasks = useCallback( ( text: string ) => {
    dispatch( setSearchText( text ) );
  }, [dispatch] );

  const handleSortColumn = useCallback( ( column: string ) => {
    dispatch( setSorting( column ) );
  }, [dispatch] );

  const handleSelectGroupBy = useCallback( ( selectedValue: string ) => {
    dispatch( setGroupBy( selectedValue === 'None' ? null : selectedValue ) );
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
    searchText,
    sortColumn,
    sortDirection,
    handleSortColumn,
    groupBy,
    handleSelectGroupBy,
  };
};

export default useTaskActionHandlers;