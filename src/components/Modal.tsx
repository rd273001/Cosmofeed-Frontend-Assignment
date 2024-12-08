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
    <div className='fixed inset-0 bg-slate-950/50 backdrop-blur-[1.5px] flex items-center justify-center'>
      <div ref={ modalContentRef } className='w-full m-4 md:w-auto bg-white p-4 rounded-xl overflow-y-auto max-h-[90%]' { ...props }>
        { children }
      </div>
    </div>
  );
};

export default Modal;