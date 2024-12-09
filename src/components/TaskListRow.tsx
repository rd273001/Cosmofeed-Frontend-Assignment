import { Edit, ListCheck, ListRestart, Trash2 } from 'lucide-react';
import React, { HTMLAttributes, MouseEvent } from 'react'
import { Task } from '../types/task';
import { ModalType } from '../types/modal';
import HighlightText from './HighlightText';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';

interface TaskListRowProps extends HTMLAttributes<HTMLDivElement> {
  task: Task;
}

const TaskListRow: React.FC<TaskListRowProps> = ( { task } ) => {
  const { searchText, handleSelectedTask, handleToggleTaskState } = useTaskActionHandlers();
  const { handleToggleModalVisibility } = useModalVisibilityHandlers();

  const handleOpenModal = ( modalType: ModalType, task: Task ) => {
    handleSelectedTask( task );
    handleToggleModalVisibility( modalType );
  };

  const handleEditTask = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    handleOpenModal( 'EditTask', task );
  };

  const handleDeleteTask = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    handleOpenModal( 'ConfirmDelete', task );
  };

  const onToggleTaskState = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    handleToggleTaskState( task.id );
  };

  return (
    <tr
      className={ `${task.currentState ? 'bg-green-100 line-through' : ''} hover:bg-gray-100 cursor-pointer` }
      onClick={ () => handleOpenModal( 'ViewTask', task ) }
    >
      <td className='p-2 border'><HighlightText wholeText={ task.title } highlightText={ searchText } /></td>
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
        <div className='flex justify-center lg:gap-6 md:gap-4 gap-4 text-sm'>
          <button
            onClick={ ( e ) => handleEditTask( e, task ) }
            className='text-blue-500 hover:text-blue-700'
          >
            <Edit />
          </button>
          <button
            onClick={ ( e ) => onToggleTaskState( e, task ) }
            className={ `
              ${task.currentState
                ? 'text-yellow-500 hover:text-yellow-700'
                : 'text-green-500 hover:text-green-700'}
            `}
          >
            { task.currentState ? <ListRestart /> : <ListCheck /> }
          </button>
          <button
            onClick={ ( e ) => handleDeleteTask( e, task ) }
            className='text-red-500 hover:text-red-700'
          >
            <Trash2 />
          </button>
        </div>
      </td>
    </tr>
  )
};

export default TaskListRow;