import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/task";
import { v4 as uuidv4 } from 'uuid';

// Simulate API delay
const MOCK_API_DELAY = 1000;  // 1 second

// Async Thunks to simulate API calls
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> ) => {
    return new Promise<Task>( ( resolve ) => {
      setTimeout( () => {
        const newTask: Task = {
          id: uuidv4(),
          currentState: false, // default to open
          createdAt: Date.now(),
          ...task
        };
        resolve( newTask );
      }, MOCK_API_DELAY );
    } );
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ( task: Task ) => {
    return new Promise<Task>( ( resolve ) => {
      setTimeout( () => {
        resolve( task );
      }, MOCK_API_DELAY );
    } );
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ( taskId: string ) => {
    return new Promise<string>( ( resolve ) => {
      setTimeout( () => {
        resolve( taskId );
      }, MOCK_API_DELAY );
    } );
  }
);