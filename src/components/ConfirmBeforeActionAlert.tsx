import React from 'react';
import Modal from './Modal';

type ActionType = 'delete' | 'save' | 'cancel' | 'default';

interface ConfirmBeforeActionAlertProps {
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  message?: string;
  actionType?: ActionType;
}

const ConfirmBeforeActionAlert: React.FC<ConfirmBeforeActionAlertProps> = ( {
  onClose,
  onConfirm,
  onCancel,
  message,
  actionType = 'default'
} ) => {
  // Define dynamic configurations based on action type
  const actionConfig = {
    delete: {
      title: 'Confirm Delete',
      defaultMessage: 'Are you sure you want to delete this item?',
      confirmButtonText: 'Delete',
      confirmButtonClasses: 'bg-red-500 hover:bg-red-600',
    },
    save: {
      title: 'Confirm Save',
      defaultMessage: 'Do you want to save the changes?',
      confirmButtonText: 'Save',
      confirmButtonClasses: 'bg-green-500 hover:bg-green-600',
    },
    cancel: {
      title: 'Confirm Cancel',
      defaultMessage: 'You have unsaved changes. Are you sure you want to discard the changes?',
      confirmButtonText: 'Discard',
      confirmButtonClasses: 'bg-red-500 hover:bg-red-600',
    },
    default: {
      title: 'Confirm Action',
      defaultMessage: 'Are you sure you want to proceed?',
      confirmButtonText: 'Confirm',
      confirmButtonClasses: 'bg-purple-500 hover:bg-purple-600',
    }
  };

  // Use the configuration for the specific action type, fallback to default
  const config = actionConfig[actionType] || actionConfig.default;

  // Use provided message or default message
  const displayMessage = message || config.defaultMessage;

  // Handle cancel action with fallback
  const handleCancel = () => {
    onCancel ? onCancel() : onClose();
  };

  return (
    <Modal
      onClose={ onClose }
    >
      <div className='md:p-4 sm:p-2 text-black'>
        <h2 className='text-xl font-semibold mb-4'>{ config.title }</h2>
        <p className='mb-6 text-gray-600'>{ displayMessage }</p>

        <div className='flex justify-end space-x-3'>
          <button
            onClick={ handleCancel }
            className={ `px-4 py-2 rounded-lg text-black bg-gray-200 hover:bg-gray-300 min-w-[25%]` }
          >
            Cancel
          </button>
          <button
            onClick={ onConfirm }
            className={ `px-4 py-2 rounded-lg min-w-[25%] ${config.confirmButtonClasses}` }
          >
            { config.confirmButtonText }
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmBeforeActionAlert;