import React, { Fragment } from 'react';
import { Task } from '../types/task';
import AddTaskForm from './AddTaskForm';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import ConfirmBeforeActionAlert from './ConfirmBeforeActionAlert';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import TaskListTableHeader from './TaskListTableHeader';
import TaskListRow from './TaskListRow';

interface TaskListProps {
  tasks: Task[] | Task[][];
}

const renderTaskList = ( tasks: Task[] | Task[][] ) => {
  // Check if tasks is grouped (2D array)
  if ( Array.isArray( tasks[0] ) && tasks[0] instanceof Array ) {
    return ( tasks as Task[][] ).map( ( group, index ) => (
      <Fragment key={ index }>
        { group.length > 0 && (
          <tr className='bg-gray-100 font-bold'>
            <td colSpan={ 5 } className='p-2 border'>
              {/* Dynamic group header based on groupBy value */ }
              { group.length > 0 && group[0].priority ?
                group[0].priority :
                group.length > 0 && group[0].createdAt ?
                  new Date( group[0].createdAt ).toLocaleDateString() :
                  group.length > 0 && group[0].dueDate ?
                    new Date( group[0].dueDate ).toLocaleDateString() :
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
  const { isViewTaskModalVisible, isEditModalVisible, isConfirmDeleteModalVisible, handleToggleModalVisibility } = useModalVisibilityHandlers();
  const { selectedTask, handleDeleteTask } = useTaskActionHandlers();

  return (
    <div>
      { tasks.length > 0 ? (
        <table className='w-full border-collapse'>
          <TaskListTableHeader />
          <tbody>
            { renderTaskList( tasks ) }
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
          message={ `Are you sure you want to delete the task '${selectedTask?.title}'?` }
        />
      ) }
    </div>
  );
};

export default TaskList;