import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskState } from '../../types/task';
import { addTask, deleteTask, updateTask } from './asyncThunks';

const initialState: TaskState = {
  tasks: [],
  searchTerm: '',
  sortColumn: null,
  sortDirection: 'asc',
  groupBy: null
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
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( addTask.fulfilled, ( state, action ) => {
        // Add new task to the beginning of the list
        state.tasks.unshift( action.payload );
      } )
      .addCase( updateTask.fulfilled, ( state, action ) => {
        const index = state.tasks.findIndex( t => t.id === action.payload.id );
        if ( index !== -1 ) {
          state.tasks[index] = action.payload;
        }
      } )
      .addCase( deleteTask.fulfilled, ( state, action ) => {
        state.tasks = state.tasks.filter( t => t.id !== action.payload );
      } );
  }
} );

export const {
  setSearchTerm,
  toggleTaskState,
} = taskSlice.actions;

export default taskSlice.reducer;