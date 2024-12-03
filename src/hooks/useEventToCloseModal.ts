import React from 'react';
import useEvent from './useEvent';

interface UseEventToCloseModalProps {
  ref: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  keysToClose?: string[];  // Optional array of keys to trigger onClose function
}

const useEventToCloseModal = ( { ref, onClose, keysToClose = ['Escape'] }: UseEventToCloseModalProps ) => {

  // Handler to close the modal on click outside Dialog area
  const handleClickOutside = ( event: MouseEvent | Event ) => {
    if ( ref.current && !ref.current.contains( event.target as Node ) ) {
      onClose();
    }
  };

  // Handler to close the modal on press 'ESC' or any other key
  const handleKeyDown = ( event: KeyboardEvent ) => {
    if ( keysToClose.includes( event.key ) ) {
      onClose(); // Trigger the onClose function when specified keys are pressed
    }
  };

  // Custom hook for taps/clicks/presses outside dialog area
  useEvent( { eventType: 'mousedown', eventHandler: handleClickOutside } );

  // Custom hook for keyboard events
  useEvent( { eventType: 'keydown', eventHandler: handleKeyDown } );
};

export default useEventToCloseModal;