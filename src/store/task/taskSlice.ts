import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskState } from '../../types/task';
import { addTask, deleteTask, updateTask } from './asyncThunks';

const initialState: TaskState = {
  tasks: [],
  searchTerm: '',
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
    setSearchTerm: ( state, action ) => {
      state.searchTerm = action.payload;
    },
    setSelectedTask: ( state, action ) => {
      state.selectedTask = action.payload;
    }
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
  setSearchTerm,
  toggleTaskState,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;