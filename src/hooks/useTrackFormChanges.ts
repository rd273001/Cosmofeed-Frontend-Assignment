import { useState, useCallback } from 'react';
import { ModalType } from '../types/modal';
import useModalVisibilityHandlers from './useModalVisibilityHanlders';

interface UseTrackFormChangesProps<T> {
  initialValues: Partial<T>;
  handleConfirmSave: () => void;
  modalType: ModalType;
}

const useTrackFormChanges = <T> ( { initialValues, handleConfirmSave: onConfirmSave, modalType }: UseTrackFormChangesProps<T> ) => {
  const [changes, setChanges] = useState<Partial<T>>( {} );
  const [hasChanges, setHasChanges] = useState( false );
  const { handleToggleModalVisibility } = useModalVisibilityHandlers();

  const trackChanges = useCallback( ( field: keyof T, newValue: T[keyof T] ) => {
    const initialValue = initialValues[field];
    console.log( 'Initial Value => ', initialValue );
    console.log( 'New Value => ', newValue );

    // Convert dates to consistent format for comparison
    const normalizedNewValue = newValue instanceof Date
      ? ( newValue as Date ).toISOString().split( 'T' )[0]
      : typeof newValue === 'string' ? newValue.trim() : newValue;

    const normalizedInitialValue = initialValue instanceof Date
      ? new Date( initialValue as Date ).toISOString().split( 'T' )[0]
      : typeof initialValue === 'string' ? initialValue.trim() : initialValue;

    // Check if the trimmed value is different
    const isActualChange = normalizedNewValue !== normalizedInitialValue;

    if ( isActualChange ) {
      setChanges( prev => ( { ...prev, [field]: newValue } ) );
      setHasChanges( true );
    } else {
      // If the value is reverted to the initial state, remove it from changes
      const restChanges = Object.entries( changes ).reduce( ( acc, [key, value] ) =>
        key === field ? acc : { ...acc, [key]: value }, {} );
      setChanges( restChanges );
      setHasChanges( Object.keys( restChanges ).length > 0 );
    }
  }, [initialValues, changes] );

  const resetChanges = useCallback( () => {
    setChanges( {} );
    setHasChanges( false );
  }, [] );

  const handleClose = useCallback( () => {
    if ( hasChanges ) {
      handleToggleModalVisibility( 'ConfirmCancel' );
    } else {
      handleToggleModalVisibility( modalType );
    }
  }, [hasChanges, modalType, handleToggleModalVisibility] );

  const handleConfirmSave = useCallback( () => {
    onConfirmSave();
    resetChanges();
  }, [onConfirmSave, resetChanges] );

  return { hasChanges, changes, trackChanges, resetChanges, handleClose, handleConfirmSave };
};

export default useTrackFormChanges;