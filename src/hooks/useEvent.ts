import { useEffect } from 'react';

interface UseEventProps<T extends keyof DocumentEventMap> {
  eventType: T;
  eventHandler: ( event: DocumentEventMap[T] ) => void;
}

const useEvent = <T extends keyof DocumentEventMap>( { eventType, eventHandler }: UseEventProps<T> ) => {

  useEffect( () => {

    // Event listener for taps/clicks/presses or keyboard presses
    document.addEventListener( eventType, eventHandler );

    // Clean up event listeners
    return () => {
      document.removeEventListener( eventType, eventHandler );
    };
  }, [eventType, eventHandler] );
};

export default useEvent;