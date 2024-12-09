import { useEffect } from 'react';

interface UseEventProps<T extends keyof DocumentEventMap | keyof WindowEventMap> {
  target?: string;
  eventType: T;
  eventHandler: ( event: T extends keyof DocumentEventMap ? DocumentEventMap[T] : WindowEventMap ) => void;
}

const useEventListener = <T extends keyof DocumentEventMap | keyof WindowEventMap> ( { target = 'document', eventType, eventHandler }: UseEventProps<T> ) => {

  useEffect( () => {
    const targetElement = target === 'window' ? window : document;

    // Event listener for taps/clicks/presses or keyboard presses
    targetElement.addEventListener( eventType, eventHandler as EventListener );

    // Clean up event listeners
    return () => {
      targetElement.removeEventListener( eventType, eventHandler as EventListener );
    };
  }, [eventType, eventHandler] );
};

export default useEventListener;