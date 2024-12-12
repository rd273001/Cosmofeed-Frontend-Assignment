import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Task } from '../types/task';
import { addTask, deleteTask, updateTask, toggleTaskState } from '../store/task/asyncThunks';
import { setSelectedTask, setSearchText, setGroupBy, setSorting } from '../store/task/taskSlice';
import { toggleModalVisibility } from '../store/modal/modalSlice';
import { GROUP_BY_DROPDOWN_OPTIONS } from '../config/taskConfig';
import { ModalType } from '../types/modal';


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
        const valueA = a[sortColumn as keyof Task];
        const valueB = b[sortColumn as keyof Task];

        if ( valueA === undefined || valueB === undefined ) return 0;

        // Handle date sorting
        if ( ( sortColumn === 'createdAt' || sortColumn === 'dueDate' ) && valueA && valueB ) {
          const dateA = new Date( valueA as number );
          const dateB = new Date( valueB as number );
          return sortDirection === 'asc'
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }

        // String comparison
        if ( typeof valueA === 'string' && typeof valueB === 'string' ) {
          return sortDirection === 'asc'
            ? valueA.localeCompare( valueB )
            : valueB.localeCompare( valueA );
        }

        // Numeric comparison for other types
        return sortDirection === 'asc'
          ? ( valueA as number ) - ( valueB as number )
          : ( valueB as number ) - ( valueA as number );
      } );
    }

    // Grouping
    if ( groupBy ) {
      const groupMap: Record<string, Task[]> = {};
      processedTasks.forEach( task => {
        let groupKey = 'Ungrouped';
        // Handle date-based grouping specifically
        if ( ( groupBy === 'createdAt' || groupBy === 'dueDate' ) && task[groupBy] ) {
          const date = new Date( task[groupBy] as number );
          groupKey = date.toLocaleDateString();
        } else if ( groupBy === 'priority' ) {
          groupKey = task.priority || 'No Priority';
        }
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

  const handleToggleTaskState = useCallback( ( taskId: string, modelType: ModalType ) => {
    dispatch( toggleTaskState( taskId ) );
    dispatch( toggleModalVisibility( modelType ) );
  }, [dispatch] );

  const handleSelectedTask = useCallback( ( task: Task ) => {
    dispatch( setSelectedTask( task ) );
  }, [dispatch] );

  const handleSearchTasks = useCallback( ( text: string ) => {
    dispatch( setSearchText( text ) );
  }, [dispatch] );

  const handleSortColumn = useCallback( ( column: string ) => {
    dispatch( setSorting( column ) );
  }, [dispatch] );

  const handleSelectGroupBy = useCallback( ( selectedValue: string ) => {
    // Map the display value to the actual group by value
    dispatch( setGroupBy( GROUP_BY_DROPDOWN_OPTIONS[selectedValue] ) );
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