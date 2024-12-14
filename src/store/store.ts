import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './task/taskSlice';
import modalReducer from './modal/modalSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistTaskConfig: PersistConfig<any> = {
  key: 'tasks',
  version: 1,
  storage,
  blacklist: ['loading', 'selectedTasksIds'],
};

const persistedTaskReducer = persistReducer( persistTaskConfig, taskReducer );

export const store = configureStore( {
  reducer: {
    tasks: persistedTaskReducer,
    modals: modalReducer,
  },
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware( {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    } ),
} );

export const persistor = persistStore( store );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;