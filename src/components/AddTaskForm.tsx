import React, { ChangeEvent, useState } from 'react';
import { Task } from '../types/task';
import { PRIORITY_OPTIONS } from '../config/taskConfig';
import Modal from './Modal';
import { ModalType } from '../types/modal';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import useTrackFormChanges from '../hooks/useTrackFormChanges';
import ConfirmBeforeActionAlert from './ConfirmBeforeActionAlert';


// Render input or plain text based on read-only mode
const renderInput = ( type: 'input' | 'textarea', props: any ) => {

  return type === 'input' ? (
    <input
      type='text'
    className='w-full border-b-2 p-0.5'
    { ...props }
    />
  ) : (
    <textarea
    className='w-full border-2 rounded p-1 focus:outline-purple-400'
    rows={ 4 }
    { ...props }
    />
  );
};

// Render select or plain text based on read-only mode
const renderSelect = ( value: string, options: string[], props: any ) => {

  return (
    <select
    value={ value }
      className='border-2 p-1.5 rounded focus-within:border-purple-400 outline-none'
      { ...props }
    >
      { options.map( option => (
        <option key={ option } value={ option }>
          { option }
        </option>
      ) ) }
    </select>
  );
};

interface AddTaskFormProps {
  modalType: ModalType;
  initialTask?: Task;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ( { modalType, initialTask } ) => {

  // Initial task data with default or initial values
  const initialTaskData: Omit<Task, 'id' | 'currentState' | 'createdAt'> = {
    title: initialTask?.title ?? '',
    description: initialTask?.description ?? '',
    priority: initialTask?.priority ?? 'None',
    dueDate: initialTask?.dueDate ? new Date( initialTask.dueDate ).toISOString().split( 'T' )[0] : '',
  };
  const [taskData, setTaskData] = useState<Task>( initialTaskData as Task );
  const { handleToggleModalVisibility, isConfirmCancelModalVisible, isConfirmSaveModalVisible } = useModalVisibilityHandlers();
  const { handleUpdateTask, handleAddTask } = useTaskActionHandlers();

  const { title, description, priority, dueDate } = taskData;

  // Check if modal type is View/Read Only type
  const isReadOnly = modalType === 'ViewTask';

  const handleSave = () => {
    if ( isReadOnly ) return;   // return if in READ-ONLY mode
    if ( title.trim().length < 10 || title.trim().length > 140 ) {
      alert( 'Title must be between 10 and 140 characters' );
      return;
    }
    if ( description.trim().length < 10 || description.trim().length > 500 ) {
      alert( 'Description must be between 10 and 500 characters' );
      return;
    }

    const taskToSave = {
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? new Date( dueDate ).getTime() : initialTask?.dueDate,
    };
    if ( initialTask ) handleUpdateTask( taskToSave as Task );  // update existing task
    else handleAddTask( taskToSave );   // update or add task
  };

  const { hasChanges, trackChanges, handleClose, handleConfirmSave } = useTrackFormChanges<Task>( {
    initialValues: initialTaskData,
    handleConfirmSave: handleSave,
    modalType
  } );

  const handleTaskDataChange = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Task ) => {
    const newValue = e.target.value;
    setTaskData( prev => ( { ...prev, [field]: newValue } ) );
    // Track changes to detect form modification
    trackChanges( field, newValue );
  };

  const onDiscard = () => {
    // Close both modal when Discard is clicked when you have changes
    handleToggleModalVisibility( 'ConfirmCancel' );
    handleToggleModalVisibility( modalType );
  };

  return (
    <Modal onClose={ handleClose }>
      <div className='md:p-4 sm:p-2'>
        <h2 className='text-xl mb-6 font-medium'>
          { isReadOnly ? 'Task Details' : ( initialTask ? 'Edit Task' : 'Add New Task' ) }
        </h2>

        <div className='flex items-center justify-center mb-4'>
          <label className='block mr-4'>Summary: </label>
          { renderInput( 'input', {
            value: title,
            onChange: ( e: ChangeEvent<HTMLInputElement> ) => handleTaskDataChange( e, 'title' ),
            placeholder: 'Enter task summary',
            maxLength: 140,
            disabled: isReadOnly,
          } ) }
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Description:</label>
          { renderInput( 'textarea', {
            value: description,
            onChange: ( e: ChangeEvent<HTMLTextAreaElement> ) => handleTaskDataChange( e, 'description' ),
            placeholder: 'Enter task description',
            maxLength: 500,
            disabled: isReadOnly
          } ) }
        </div>

        <div className='flex justify-between gap-8 mb-4'>
          <div className='flex items-center'>
            <label className='block mr-2'>Priority: </label>
            { renderSelect( priority, PRIORITY_OPTIONS, {
              onChange: ( e: ChangeEvent<HTMLInputElement> ) => handleTaskDataChange( e, 'priority' ),
              disabled: isReadOnly
            } ) }
          </div>

          <div className='flex items-center'>
            <label className='block mr-2'>Due date: </label>
            { isReadOnly ? (
              <div className='border p-1 bg-gray-100 text-gray-700'>
                { dueDate
                  ? new Date( dueDate ).toLocaleDateString()
                  : 'No due date' }
              </div>
            ) : (
              <input
                type='date'
                value={ dueDate }
                onChange={ ( e ) => handleTaskDataChange( e, 'dueDate' ) }
                className='border-2 p-1 rounded focus-within:border-purple-400'
              />
            ) }
          </div>

        </div>

        {
          isReadOnly && (
            <div className='flex justify-between gap-8 mb-4'>
              <div className='flex items-center'>
                <label className='block mr-2'>Current state: </label>
                <p>{ initialTask?.currentState ? 'Completed' : 'Pending' }</p>
              </div>

              <div className='flex items-center'>
                <label className='block mr-2'>Created on: </label>
                <p>{ new Date( initialTask?.createdAt as number ).toLocaleDateString() }</p>
              </div>
            </div>
          )
        }

        <div className='flex justify-end gap-4 mt-8'>
          <button
            onClick={ handleClose }
            className='px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg min-w-fit w-[28%] max-w-36'
          >
            { isReadOnly ? 'Close' : 'Cancel' }
          </button>
          { modalType !== 'ViewTask' && (
            <button
              onClick={ () => handleToggleModalVisibility('ConfirmSave') }
              disabled={ !hasChanges }
              className={ `px-4 py-2 text-white rounded-lg min-w-fit w-[28%] max-w-36 bg-purple-500 enabled:hover:bg-purple-600` }
            >
              Save
            </button>
          ) }
        </div>
      </div>

      {/* Alert for Discarding changes(if any) */}
      { isConfirmCancelModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='cancel'
          onConfirm={ onDiscard }
          onClose={ () => handleToggleModalVisibility( 'ConfirmCancel' ) }
        />
      ) }

      { isConfirmSaveModalVisible && (
        <ConfirmBeforeActionAlert
          actionType='save'
          onConfirm={ handleConfirmSave }
          onClose={ () => handleToggleModalVisibility( 'ConfirmSave' ) }
        />
      ) }
    </Modal>
  );
};

export default AddTaskForm;