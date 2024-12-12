import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types/task';
import { addTask, bulkDeleteTask, bulkToggleTaskState, deleteTask, toggleTaskState, updateTask } from './asyncThunks';

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
  },
  extraReducers: ( builder ) => {
    builder
      // Add new Task
      .addCase( addTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( addTask.fulfilled, ( state, action ) => {
        // Add new task to the beginning of the list
        state.tasks.unshift( action.payload );
        state.loading = false;
      } )
      .addCase( addTask.rejected, ( state ) => {
        state.loading = false;
      } )
      // Update/Edit existing Task
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
      .addCase( updateTask.rejected, ( state ) => {
        state.loading = false;
      } )
      // Delete Task
      .addCase( deleteTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( deleteTask.fulfilled, ( state, action ) => {
        state.tasks = state.tasks.filter( t => t.id !== action.payload );
        state.loading = false;
      } )
      .addCase( deleteTask.rejected, ( state ) => {
        state.loading = false;
      } )
      // Toggle Task current state as Done/Pending
      .addCase( toggleTaskState.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( toggleTaskState.fulfilled, ( state, action ) => {
        const task = state.tasks.find( t => t.id === action.payload );
        if ( task ) {
          task.currentState = !task.currentState;
        }
        state.loading = false;
      } )
      .addCase( toggleTaskState.rejected, ( state ) => {
        state.loading = false;
      } )
      // Bulk Toggle Task current state as Done/Pending
      .addCase( bulkToggleTaskState.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( bulkToggleTaskState.fulfilled, ( state, action ) => {
        const { taskIds, taskState } = action.payload;
        state.tasks = state.tasks.map( task => taskIds.includes( task.id )
          ? { ...task, currentState: taskState }   // set state directly as true or false for marking as done or pending respectively
          : task
        );
        // Clear selection after bulk action
        state.selectedTasksIds = [];
        state.loading = false;
      } )
      .addCase( bulkToggleTaskState.rejected, ( state ) => {
        state.loading = false;
      } )
      // Bulk Delete tasks
      .addCase( bulkDeleteTask.pending, ( state ) => {
        state.loading = true;
      } )
      .addCase( bulkDeleteTask.fulfilled, ( state, action ) => {
        const taskIdsToDelete = action.payload;
        state.tasks = state.tasks.filter( task => !taskIdsToDelete.includes( task.id ) );  // remove the tasks with ids which are in taskIdsToDelete array
        // Clear selection after bulk action
        state.selectedTasksIds = [];
        state.loading = false;
      } )
      .addCase( bulkDeleteTask.rejected, ( state ) => {
        state.loading = false;
      } );
  }
} );

export const {
  setSearchText,
  setSelectedTask,
  setSorting,
  setGroupBy,
  setSelectedTasksIds,
  clearSelectedTasksIds,
  toggleBulkTaskSelection,
} = taskSlice.actions;

export default taskSlice.reducer;