import React, { useState } from 'react';
import { Task, TaskPriority } from '../types/task';
import { PRIORITY_OPTIONS } from '../config/taskConfig';
import Modal from './Modal';
import { ModalType } from '../types/modal';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';

interface AddTaskFormProps {
  modalType: ModalType;
  onSave?: ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> | Task, onClose?: ( modalType: ModalType ) => void ) => void;
  onUpdate?: ( task: Task, onClose?: ( modalType: ModalType ) => void ) => void;
  initialTask?: Task;
}

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
const renderSelect = ( value: string, options: string[], setPriority: ( priority: TaskPriority ) => void, props: any ) => {

  return (
    <select
      value={ value }
      onChange={ ( e ) => setPriority( e.target.value as TaskPriority ) }
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

const AddTaskForm: React.FC<AddTaskFormProps> = ( { modalType, onSave, onUpdate, initialTask } ) => {
  const [title, setTitle] = useState( initialTask?.title ?? '' );
  const [description, setDescription] = useState( initialTask?.description ?? '' );
  const [priority, setPriority] = useState( initialTask?.priority ?? 'None' );
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate
      ? new Date( initialTask.dueDate ).toISOString().split( 'T' )[0]
      : ''
  );

  const { handleToggleModalVisibility } = useModalVisibilityHandlers();

  const handleSave = () => {
    if ( modalType === 'ViewTask' ) return;   // return if in read-only mode

    if ( title.trim().length < 10 || title.trim().length > 140 ) {
      alert( 'Title must be between 10 and 140 characters' );
      return;
    }

    if ( description.trim().length < 10 || description.trim().length > 500 ) {
      alert( 'Description must be between 10 and 500 characters' );
      return;
    }

    const taskData = {
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? new Date( dueDate ).getTime() : initialTask?.dueDate,
    };

    if ( initialTask ) onUpdate?.( taskData as Task );   // update existing task
    else onSave?.( taskData );   // update or add task

    handleToggleModalVisibility( modalType );   // close modal after saving data
  };

  return (
    <Modal onClose={ () => handleToggleModalVisibility( modalType ) }>
      <div className='md:p-4 sm:p-2'>
        <h2 className='text-xl mb-6 font-medium'>
          { modalType === 'ViewTask' ? 'Task Details' : ( initialTask ? 'Edit Task' : 'Add New Task' ) }
        </h2>

        <div className='flex items-center justify-center mb-4'>
          <label className='block mr-4'>Summary: </label>
          { renderInput( 'input', {
            value: title,
            onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => setTitle( e.target.value ),
            placeholder: 'Enter task summary',
            maxLength: 140,
            disabled: modalType === 'ViewTask' ? true : false
          } ) }
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Description:</label>
          { renderInput( 'textarea', {
            value: description,
            onChange: ( e: React.ChangeEvent<HTMLTextAreaElement> ) => setDescription( e.target.value ),
            placeholder: 'Enter task description',
            maxLength: 500,
            disabled: modalType === 'ViewTask' ? true : false
          } ) }
        </div>

        <div className='flex justify-between gap-8 mb-4'>
          <div className='flex items-center'>
            <label className='block mr-2'>Priority: </label>
            { renderSelect( priority, PRIORITY_OPTIONS, setPriority, {
              disabled: modalType === 'ViewTask' ? true : false
            } ) }
          </div>

          <div className='flex items-center'>
            <label className='block mr-2'>Due date: </label>
            { modalType === 'ViewTask' ? (
              <div className='border p-1 bg-gray-100 text-gray-700'>
                { dueDate
                  ? new Date( dueDate ).toLocaleDateString()
                  : 'No due date' }
              </div>
            ) : (
              <input
                type='date'
                value={ dueDate }
                onChange={ ( e ) => setDueDate( e.target.value ) }
                className='border-2 p-1 rounded focus-within:border-purple-400'
              />
            ) }
          </div>

        </div>

        {
          modalType === 'ViewTask' && (
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
            onClick={ () => handleToggleModalVisibility( modalType ) }
            className='px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg min-w-fit w-[28%] max-w-36'
          >
            { modalType === 'ViewTask' ? 'Close' : 'Cancel' }
          </button>
          { modalType !== 'ViewTask' && (
            <button
              onClick={ handleSave }
              className='px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg min-w-fit w-[28%] max-w-36'
            >
              Save
            </button>
          ) }
        </div>
      </div>
    </Modal>
  );
};

export default AddTaskForm;