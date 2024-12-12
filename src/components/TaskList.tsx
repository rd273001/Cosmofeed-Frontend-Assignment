import React, { Fragment } from 'react';
import { Task } from '../types/task';
import AddTaskForm from './AddTaskForm';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import ConfirmBeforeActionAlert from './ConfirmBeforeActionAlert';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import TaskListTableHeader from './TaskListTableHeader';
import TaskListRow from './TaskListRow';
import useBulkTaskActions from '../hooks/useBulkTaskActions';

interface TaskListProps {
  tasks: Task[] | Task[][];
}

const renderTaskList = ( tasks: Task[] | Task[][], groupBy: string ) => {
  // Check if tasks is grouped (2D array)
  if ( groupBy ) {
    return ( tasks as Task[][] ).map( ( group, index ) => (
      <Fragment key={ index }>
        { group.length > 0 && (
          <tr className='bg-gray-200 font-semibold'>
            <td colSpan={ 6 } className='p-2 border border-gray-300'>
              {/* Dynamic group header based on groupBy value */ }
              { group.length > 0 ?
                groupBy === 'createdAt' && group[0].createdAt ?
                  new Date( group[0].createdAt ).toLocaleDateString() :
                  groupBy === 'dueDate' ?
                    Object.keys( group[0] ).includes( 'dueDate' ) && group[0].dueDate ?
                      new Date( group[0].dueDate ).toLocaleDateString() : 'No Due Date' :
                    groupBy === 'priority' && group[0].priority :
                'None'
              }
            </td>
          </tr>
        ) }
        { group.map( ( task ) => <TaskListRow key={ task.id } task={ task } /> ) }
      </Fragment>
    ) );
  }

  // If not grouped, render all tasks
  return ( tasks as Task[] ).map( ( task ) => <TaskListRow key={ task.id } task={ task } /> );
};

const TaskList: React.FC<TaskListProps> = ( { tasks } ) => {

  const {
    isViewTaskModalVisible,
    isEditModalVisible,
    isConfirmDeleteModalVisible,
    isToggleTaskAsDoneModalVisible,
    isToggleTaskAsPendingModalVisible,
    isConfirmBulkMarkAsPendingModalVisible,
    isConfirmBulkMarkAsDoneModalVisible,
    isConfirmBulkDeleteModalVisible,
    handleToggleModalVisibility
  } = useModalVisibilityHandlers();

  const { selectedTask, handleDeleteTask, groupBy, handleToggleTaskState } = useTaskActionHandlers();
  const { selectedTasksIds, handleBulkMarkAsDone, handleBulkMarkAsPending, handleBulkDelete } = useBulkTaskActions();

  return (
    <div>
      { selectedTasksIds.length > 0 && (
        <div className='mb-4 flex items-center space-x-2'>
          <span>{ selectedTasksIds.length } tasks selected</span>
          <button
            onClick={ () => handleToggleModalVisibility( 'ConfirmBulkMarkAsDone' ) }
            className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'
          >
            Mark as Done
          </button>
          <button
            onClick={ () => handleToggleModalVisibility( 'ConfirmBulkMarkAsPending' ) }
            className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'
          >
            Mark as Pending
          </button>
          <button
            onClick={ () => handleToggleModalVisibility( 'ConfirmBulkDelete' ) }
            className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      ) }

      { tasks.length > 0 ? (
        <table className='w-full border-collapse'>
          <TaskListTableHeader />
          <tbody>
            { renderTaskList( tasks, groupBy as string ) }
          </tbody>
        </table>
      ) : (
        <p className='text-center text-gray-500'>No tasks found</p>
      ) }

      { isViewTaskModalVisible && <AddTaskForm modalType='ViewTask' initialTask={ selectedTask as Task } /> }

      { isEditModalVisible && <AddTaskForm modalType='EditTask' initialTask={ selectedTask as Task } /> }

      { isConfirmDeleteModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='delete'
          onConfirm={ () => handleDeleteTask( selectedTask?.id as string ) }
          onClose={ () => handleToggleModalVisibility( 'ConfirmDelete' ) }
          message={ `Are you sure you want to delete the task - '${selectedTask?.title}'?` }
        />
      ) }

      { isToggleTaskAsDoneModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='default'
          onConfirm={ () => handleToggleTaskState( selectedTask?.id as string, 'ToggleTaskAsDone' ) }
          onClose={ () => handleToggleModalVisibility( 'ToggleTaskAsDone' ) }
          message={ `Are you sure you want to Mark Task as Done?` }
        />
      ) }

      { isToggleTaskAsPendingModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='default'
          onConfirm={ () => handleToggleTaskState( selectedTask?.id as string, 'ToggleTaskAsPending' ) }
          onClose={ () => handleToggleModalVisibility( 'ToggleTaskAsPending' ) }
          message={ `Are you sure you want to Mark Task as Pending?` }
        />
      ) }

      { isConfirmBulkMarkAsDoneModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='default'
          onConfirm={ handleBulkMarkAsDone }
          onClose={ () => handleToggleModalVisibility( 'ConfirmBulkMarkAsDone' ) }
          message={ `Are you sure you want to Mark ${selectedTasksIds.length} selected task(s) as Done?` }
        />
      ) }
      { isConfirmBulkMarkAsPendingModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='default'
          onConfirm={ handleBulkMarkAsPending }
          onClose={ () => handleToggleModalVisibility( 'ConfirmBulkMarkAsPending' ) }
          message={ `Are you sure you want to Mark ${selectedTasksIds.length} selected task(s) as Pending?` }
        />
      ) }

      { isConfirmBulkDeleteModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='delete'
          onConfirm={ handleBulkDelete }
          onClose={ () => handleToggleModalVisibility( 'ConfirmBulkDelete' ) }
          message={ `Are you sure you want to delete ${selectedTasksIds.length} selected task(s)?` }
        />
      ) }
    </div>
  );
};

export default TaskList;