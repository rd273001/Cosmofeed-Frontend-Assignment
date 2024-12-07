import React from 'react';
import { Task } from '../types/task';
import TaskRow from './TaskRow';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ( { tasks } ) => {

  return (
    <div>
      { tasks.length > 0 ? (
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-2 border'>Summary</th>
              <th className='p-2 border'>Priority</th>
              <th className='p-2 border'>Created On</th>
              <th className='p-2 border'>Due Date</th>
              <th className='p-2 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            { tasks.map( task => (
              <TaskRow key={ task.id } task={ task } />
            ) ) }
          </tbody>
        </table>
      ) : (
        <p className='text-center text-gray-500'>No tasks found</p>
      ) }
    </div>
  );
};

export default TaskList;