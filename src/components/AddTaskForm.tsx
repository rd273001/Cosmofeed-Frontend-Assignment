import React, { useState } from 'react';
import { Task, TaskPriority } from '../types/task';
import { PRIORITY_OPTIONS } from '../config/taskConfig';

interface AddTaskFormProps {
  onSave?: ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> ) => void;
  onClose: () => void;
  initialTask?: Task;
  readOnly?: boolean; // prop to indicate read-only mode
}

// Render input or plain text based on read-only mode
const renderInput = ( type: 'input' | 'textarea', props: any ) => {
  if ( props.readOnly ) {
    return (
      <div className='w-full border p-2 bg-gray-100 text-gray-700'>
        { props.value || 'Not specified' }
      </div>
    );
  }

  return type === 'input' ? (
    <input
      type='text'
      { ...props }
      className='w-full border-b-2 p-0.5 focus:border-b-purple-400 outline-none'
    />
  ) : (
    <textarea
      { ...props }
      className='w-full border p-1 focus:outline-purple-400'
      rows={ 4 }
    />
  );
};

// Render select or plain text based on read-only mode
const renderSelect = ( value: string, options: string[], setPriority: (priority: TaskPriority) => void, readOnly = false ) => {
  if ( readOnly ) {
    return (
      <div className='border p-2 bg-gray-100 text-gray-700'>
        { value || 'Not specified' }
      </div>
    );
  }

  return (
    <select
      value={ value }
      onChange={ ( e ) => setPriority( e.target.value as TaskPriority ) }
      className='border p-1.5 rounded'
    >
      { options.map( option => (
        <option key={ option } value={ option }>
          { option }
        </option>
      ) ) }
    </select>
  );
};

const AddTaskForm: React.FC<AddTaskFormProps> = ( { onSave, onClose, initialTask, readOnly = false } ) => {
  const [title, setTitle] = useState( initialTask?.title || '' );
  const [description, setDescription] = useState( initialTask?.description || '' );
  const [priority, setPriority] = useState( initialTask?.priority || 'None' );
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate
      ? new Date( initialTask.dueDate ).toISOString().split( 'T' )[0]
      : ''
  );

  const handleSave = () => {
    if ( readOnly || !onSave ) return;   // return if in read-only mode

    if ( title.trim().length < 10 || title.trim().length > 140 ) {
      alert( 'Title must be between 10 and 140 characters' );
      return;
    }

    if ( description.trim().length < 10 || description.trim().length > 500 ) {
      alert( 'Description must be between 10 and 500 characters' );
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? new Date( dueDate ).getTime() : undefined,
    };

    onSave( taskData ); // update or add task
    onClose();   // close modal after saving data
  };

  return (
    <div>
      <h2 className='text-xl mb-6 font-medium'>
        { readOnly ? 'Task Details' : ( initialTask ? 'Edit Task' : 'Add New Task' ) }
      </h2>

      <div className='flex items-center justify-center mb-4'>
        <label className='block mr-4'>Summary: </label>
        { renderInput( 'input', {
          value: title,
          onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => setTitle( e.target.value ),
          placeholder: 'Enter task summary',
          maxLength: 140,
          readOnly
        } ) }
      </div>

      <div className='mb-4'>
        <label className='block mb-2'>Description:</label>
        { renderInput( 'textarea', {
          value: description,
          onChange: ( e: React.ChangeEvent<HTMLTextAreaElement> ) => setDescription( e.target.value ),
          placeholder: 'Enter task description',
          maxLength: 500,
          readOnly
        } ) }
      </div>

      <div className='flex justify-between gap-8 mb-4'>
        <div className='flex items-center'>
          <label className='block mr-2'>Priority: </label>
          { renderSelect( priority, PRIORITY_OPTIONS, setPriority ) }
        </div>

        <div className='flex items-center'>
          <label className='block mr-2'>Due date: </label>
          { readOnly ? (
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
              className='border p-1 rounded'
            />
          ) }
        </div>
          
      </div>

      <div className='flex justify-end space-x-4 mt-8'>
        <button
          onClick={ onClose }
          className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg min-w-[25%]'
        >
          { readOnly ? 'Close' : 'Cancel' }
        </button>
        { !readOnly && (
          <button
            onClick={ handleSave }
            className='px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg min-w-[25%]'
          >
            Save
          </button>
        ) }
      </div>
    </div>
  );
};

export default AddTaskForm;