import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task/taskSlice';
import modalReducer from './modal/modalSlice';

export const store = configureStore( {
  reducer: {
    tasks: taskReducer,
    modals: modalReducer,
  },
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;