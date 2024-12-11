import { CheckSquare, Edit, ListCheck, ListRestart, Square, Trash2 } from 'lucide-react';
import React, { HTMLAttributes, MouseEvent } from 'react'
import { Task } from '../types/task';
import { ModalType } from '../types/modal';
import HighlightText from './HighlightText';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import useBulkTaskActions from '../hooks/useBulkTaskActions';

interface TaskListRowProps extends HTMLAttributes<HTMLDivElement> {
  task: Task;
}

const TaskListRow: React.FC<TaskListRowProps> = ( { task } ) => {
  const { searchText, handleSelectedTask, handleToggleTaskState } = useTaskActionHandlers();
  const { handleToggleModalVisibility } = useModalVisibilityHandlers();
  const { selectedTasksIds, handleToggleBulkTaskSelection } = useBulkTaskActions();

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

  const handleBulkTaskSelection = ( e: MouseEvent, taskId: string ) => {
    e.stopPropagation();
    handleToggleBulkTaskSelection( taskId );
  };

  const isSelected = selectedTasksIds.includes( task.id );

  return (
    <tr
      className={ `hover:bg-gray-200 ${task.currentState ? 'bg-green-200 hover:bg-green-300 line-through' : ''} cursor-pointer` }
      onClick={ () => handleOpenModal( 'ViewTask', task ) }
    >
      <td
        className='group peer bg-gray-100 p-2 border border-gray-300 cursor-pointer'
        onClick={ ( e ) => handleBulkTaskSelection( e, task.id ) }
        onMouseEnter={ (e) => e.stopPropagation() }
        onMouseLeave={ (e) => e.stopPropagation() }
      >
        { isSelected ?
          <CheckSquare
            onClick={ ( e ) => handleBulkTaskSelection( e, task.id ) }
            className='size-5 text-purple-600 fill-white group-hover:text-purple-400'
          /> :
          <Square
            onClick={ ( e ) => handleBulkTaskSelection( e, task.id ) }
            className='size-5 text-gray-400 fill-white group-hover:text-purple-600'
          />
        }
      </td>
      <td className='p-2 border border-gray-300 peer-hover:bg-gray-100'><HighlightText wholeText={ task.title } highlightText={ searchText } /></td>
      <td className='p-2 border border-gray-300 peer-hover:bg-gray-100'>{ task.priority }</td>
      <td className='p-2 border border-gray-300 peer-hover:bg-gray-100'>
        { new Date( task.createdAt ).toLocaleDateString() }
      </td>
      <td className='p-2 border border-gray-300 peer-hover:bg-gray-100'>
        { task.dueDate
          ? new Date( task.dueDate ).toLocaleDateString()
          : 'No due date' }
      </td>
      <td className='p-2 border border-gray-300 peer-hover:bg-gray-100'>
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