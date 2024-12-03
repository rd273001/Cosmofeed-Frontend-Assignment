import React, { useRef } from 'react';
import useEventToCloseModal from '../hooks/useEventToCloseModal';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  keysToClose?: string[];
  [key: string]: any;  // additional props
}

const Modal:React.FC<ModalProps> = ( { onClose, keysToClose = [ 'Escape' ], children, ...props } ) => {
  const modalContentRef = useRef<HTMLDivElement | null>( null );

  // hook to close the modal on events
  useEventToCloseModal( { ref: modalContentRef, onClose, keysToClose } );

  return (
    <div className='fixed inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center'>
      <div ref={ modalContentRef } className='w-full m-4 md:w-auto bg-white p-4 rounded-xl' { ...props }>
        { children }
      </div>
    </div>
  );
};

export default Modal;