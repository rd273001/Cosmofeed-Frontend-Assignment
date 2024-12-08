import React, { MouseEvent } from 'react';
import { Task } from '../types/task';
import { ModalType } from '../types/modal';
import { Edit, ListCheck, ListRestart, Trash2 } from 'lucide-react';
import AddTaskForm from './AddTaskForm';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import ConfirmBeforeActionAlert from './ConfirmBeforeActionAlert';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: ( task: Task, onClose?: ( modalType: ModalType ) => void ) => void;
  onDeleteTask: ( taskId: string, onClose?: ( modalType: ModalType ) => void ) => void;
  onToggleTaskState: ( taskId: string ) => void;
  onModalOpen: ( modalName: ModalType ) => void;
  selectedTask: Task;
  setSelectedTask: ( task: Task ) => void;
}

const TaskList: React.FC<TaskListProps> = ( { tasks, onUpdateTask, onDeleteTask, onToggleTaskState, onModalOpen, selectedTask, setSelectedTask } ) => {
  const { isViewTaskModalVisible, isEditModalVisible, isConfirmDeleteModalVisible } = useModalVisibilityHandlers();

  const handleOpenModal = ( modalName: ModalType, task: Task ) => {
    onModalOpen( modalName );
    setSelectedTask( task );
  };

  const handleEditTask = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    handleOpenModal( 'EditTask', task );
  };

  const handleDeleteTask = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    handleOpenModal( 'ConfirmDelete', task );
  };

  const handleToggleTaskState = ( e: MouseEvent, task: Task ) => {
    e.stopPropagation();
    onToggleTaskState( task.id );
  };

  const handleConfirmDelete = () => {
    onDeleteTask( selectedTask.id );
    onModalOpen( 'ConfirmDelete' );
  };

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
              <tr
                key={ task.id }
                className={ `${task.currentState ? 'bg-green-100 line-through' : ''} hover:bg-gray-100 cursor-pointer` }
                onClick={ () => handleOpenModal( 'ViewTask', task ) }
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
                  <div className='flex justify-center lg:gap-6 md:gap-4 gap-4 text-sm'>
                    <button
                      onClick={ ( e ) => handleEditTask( e, task ) }
                      className='text-blue-500 hover:text-blue-700'
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={ ( e ) => handleToggleTaskState( e, task ) }
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
            ) ) }
          </tbody>
        </table>
      ) : (
        <p className='text-center text-gray-500'>No tasks found</p>
      ) }

      { isViewTaskModalVisible && <AddTaskForm modalType='ViewTask' initialTask={ selectedTask } /> }
      { isEditModalVisible && <AddTaskForm modalType='EditTask' initialTask={ selectedTask } onUpdate={ onUpdateTask } /> }
      { isConfirmDeleteModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='delete'
          onConfirm={ handleConfirmDelete }
          onClose={ () => onModalOpen( 'ConfirmDelete' ) }
          message={ `Are you sure you want to delete the task '${selectedTask?.title}'?` }
        />
      ) }
    </div>
  );
};

export default TaskList;