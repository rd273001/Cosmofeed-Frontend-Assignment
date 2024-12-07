import React, { useState } from 'react';
import { Task } from '../types/task';
import AddTaskForm from './AddTaskForm';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';

interface TaskRowProps {
  task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ( { task } ) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState( false );
  const [isViewModalOpen, setIsViewModalOpen] = useState( false );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState( false );

  const { handleDeleteTask, handleToggleTaskState } = useTaskActionHandlers();

  return (
    <>
      <tr
        className={ `
          ${task.currentState ? 'bg-green-100 line-through' : ''}
          hover:bg-gray-100 cursor-pointer
        `}
        onClick={ () => setIsViewModalOpen( true ) }
      >
        <td className='p-2 border'>{ task.title }</td>
        <td className='p-2 border'>{ task.priority }</td>
        <td className='p-2 border'>
          { new Date( task.createdAt ).toLocaleDateString() }
        </td>
        <td className='p-2 border'>
          { task.dueDate
            ? new Date( task.dueDate ).toLocaleDateString()
            : 'No due date' }
        </td>
        <td className='p-2 border'>
          <div className='flex space-x-2'>
            <button
              onClick={ ( e ) => {
                e.stopPropagation();
                setIsEditModalOpen( true );
              } }
              className='text-blue-500 hover:text-blue-700'
            >
              Edit
            </button>
            <button
              onClick={ ( e ) => {
                e.stopPropagation();
                handleToggleTaskState(task.id);
              } }
              className={ `
                ${task.currentState
                  ? 'text-yellow-500 hover:text-yellow-700'
                  : 'text-green-500 hover:text-green-700'}
              `}
            >
              { task.currentState ? 'Re-open' : 'Done' }
            </button>
            <button
              onClick={ ( e ) => {
                e.stopPropagation();
                setIsDeleteModalOpen( true );
              } }
              className='text-red-500 hover:text-red-700'
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* View Modal (Read-Only) */ }
      { isViewModalOpen && (
        <AddTaskForm
          onClose={ () => setIsViewModalOpen( false ) }
          initialTask={ task }
          readOnly={ true }
        />
      ) }

      {/* Edit Modal */ }
      { isEditModalOpen && (
        <AddTaskForm
          onClose={ () => setIsEditModalOpen( false ) }
          initialTask={ task }
        />
      ) }

      {/* Delete Confirmation Modal */ }
    </>
  );
};

export default TaskRow;