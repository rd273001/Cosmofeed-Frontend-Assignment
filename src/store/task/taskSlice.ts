import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types/task';
import { addTask, deleteTask, updateTask } from './asyncThunks';

const initialState: TaskState = {
  tasks: [],
  searchText: '',
  sortColumn: null,
  sortDirection: 'asc',
  groupBy: null,
  loading: false,
  selectedTask: null,
  selectedTasksIds: [],
};

const taskSlice = createSlice( {
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskState: ( state, action: PayloadAction<string> ) => {
      const task = state.tasks.find( t => t.id === action.payload );
      if ( task ) {
        task.currentState = !task.currentState;
      }
    },
    setSearchText: ( state, action: PayloadAction<string> ) => {
      state.searchText = action.payload;
    },
    setSelectedTask: ( state, action: PayloadAction<Task> ) => {
      state.selectedTask = action.payload;
    },
    setSorting: ( state, action: PayloadAction<string> ) => {
      // If clicking the same column, toggle direction
      if ( state.sortColumn === action.payload ) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // New column, default to ascending
        state.sortColumn = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setGroupBy: ( state, action: PayloadAction<string | null> ) => {
      state.groupBy = action.payload;
    },

    // bulk action reducers
    setSelectedTasksIds: ( state, action: PayloadAction<string[]> ) => {
      state.selectedTasksIds = action.payload;
    },
    clearSelectedTasksIds: ( state ) => {
      state.selectedTasksIds = [];
    },
    toggleBulkTaskSelection: ( state, action: PayloadAction<string> ) => {
      const taskId = action.payload;
      const index = state.selectedTasksIds.indexOf( taskId );
      if ( index !== -1 ) {
        // If task is already selected, remove it
        state.selectedTasksIds.splice( index, 1 );
      } else {
        // If task is not selected, add it
        state.selectedTasksIds.push( taskId );
      }
    },
    bulkUpdateTaskState: ( state, action: PayloadAction<{ taskIds: string[], state: boolean }> ) => {
      const { taskIds, state: newState } = action.payload;
      state.tasks = state.tasks.map( task =>
        taskIds.includes( task.id )
          ? { ...task, currentState: newState }
          : task
      );
      // Clear selection after bulk action
      state.selectedTasksIds = [];
    },
    bulkDeleteTasks: ( state, action: PayloadAction<string[]> ) => {
      const taskIdsToDelete = action.payload;
      state.tasks = state.tasks.filter( task => !taskIdsToDelete.includes( task.id ) );
      // Clear selection after bulk action
      state.selectedTasksIds = [];
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( addTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( addTask.fulfilled, ( state, action ) => {
        // Add new task to the beginning of the list
        state.tasks.unshift( action.payload );
        state.loading = false;
      } )
      .addCase( updateTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( updateTask.fulfilled, ( state, action ) => {
        const index = state.tasks.findIndex( t => t.id === action.payload.id );
        if ( index !== -1 ) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      } )
      .addCase( deleteTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( deleteTask.fulfilled, ( state, action ) => {
        state.tasks = state.tasks.filter( t => t.id !== action.payload );
        state.loading = false;
      } );
  }
} );

export const {
  setSearchText,
  toggleTaskState,
  setSelectedTask,
  setSorting,
  setGroupBy,
  setSelectedTasksIds,
  clearSelectedTasksIds,
  toggleBulkTaskSelection,
  bulkUpdateTaskState,
  bulkDeleteTasks,
} = taskSlice.actions;

export default taskSlice.reducer;