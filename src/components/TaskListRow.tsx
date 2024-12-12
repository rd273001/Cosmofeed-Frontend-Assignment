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
  const { searchText, handleSelectedTask } = useTaskActionHandlers();
  const { handleToggleModalVisibility } = useModalVisibilityHandlers();
  const { selectedTasksIds, handleToggleBulkTaskSelection } = useBulkTaskActions();

  const handleOpenModal = ( modalType: ModalType ) => {
    handleSelectedTask( task );
    handleToggleModalVisibility( modalType );
  };

  const handleEditTask = ( e: MouseEvent ) => {
    e.stopPropagation();
    handleOpenModal( 'EditTask' );
  };

  const handleDeleteTask = ( e: MouseEvent ) => {
    e.stopPropagation();
    handleOpenModal( 'ConfirmDelete' );
  };

  const onToggleTaskState = ( e: MouseEvent ) => {
    e.stopPropagation();
    handleOpenModal( task.currentState ? 'ToggleTaskAsPending' : 'ToggleTaskAsDone' );
  };

  const handleBulkTaskSelection = ( e: MouseEvent ) => {
    e.stopPropagation();
    handleToggleBulkTaskSelection( task.id );
  };

  const isSelected = selectedTasksIds.includes( task.id );

  return (
    <tr
      className={ `hover:bg-gray-200 ${task.currentState ? 'bg-green-200 hover:bg-green-300 line-through' : ''} cursor-pointer` }
      onClick={ () => handleOpenModal( 'ViewTask' ) }
    >
      <td
        className='group peer bg-gray-100 p-2 border border-gray-300 cursor-pointer'
        onClick={ handleBulkTaskSelection }
      >
        { isSelected ?
          <CheckSquare
            onClick={ handleBulkTaskSelection }
            className='size-5 text-purple-600 fill-white group-hover:text-purple-400'
          /> :
          <Square
            onClick={ handleBulkTaskSelection }
            className='size-5 text-gray-400 fill-white group-hover:text-purple-600'
          />
        }
      </td>
      <td className={ `p-2 border border-gray-300 peer-hover:bg-gray-100 ${task.currentState ? 'peer-hover:bg-green-200' : ''}` }><HighlightText wholeText={ task.title } highlightText={ searchText } /></td>
      <td className={ `p-2 border border-gray-300 peer-hover:bg-gray-100 ${task.currentState ? 'peer-hover:bg-green-200' : ''}` }>{ task.priority }</td>
      <td className={ `p-2 border border-gray-300 peer-hover:bg-gray-100 ${task.currentState ? 'peer-hover:bg-green-200' : ''}` }>
        { new Date( task.createdAt ).toLocaleDateString() }
      </td>
      <td className={ `p-2 border border-gray-300 peer-hover:bg-gray-100 ${task.currentState ? 'peer-hover:bg-green-200' : ''}` }>
        { task.dueDate
          ? new Date( task.dueDate ).toLocaleDateString()
          : 'No due date' }
      </td>
      <td className={ `p-2 border border-gray-300 peer-hover:bg-gray-100 ${task.currentState ? 'peer-hover:bg-green-200' : ''}` }>
        <div className='flex justify-center lg:gap-6 md:gap-4 gap-4 text-sm'>
          <button
            onClick={ handleEditTask }
            className='text-blue-500 hover:text-blue-700'
          >
            <Edit />
          </button>
          <button
            onClick={ onToggleTaskState }
            className={ `
              ${task.currentState
                ? 'text-yellow-500 hover:text-yellow-700'
                : 'text-green-500 hover:text-green-700'}
            `}
          >
            { task.currentState ? <ListRestart /> : <ListCheck /> }
          </button>
          <button
            onClick={ handleDeleteTask }
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