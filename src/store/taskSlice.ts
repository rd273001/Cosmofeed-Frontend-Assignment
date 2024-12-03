import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from '../types/task';

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

  },
  extraReducers: ( builder ) => {

  }
} );

export const {

} = taskSlice.actions;

export default taskSlice.reducer;