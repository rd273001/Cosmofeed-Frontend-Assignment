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
} = taskSlice.actions;

export default taskSlice.reducer;