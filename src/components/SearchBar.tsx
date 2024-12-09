import React, { useRef } from 'react';
import { Search } from 'lucide-react';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import useEventListener from '../hooks/useEventListener';

const SearchBar: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>( null );
  const { handleSearchTasks, searchText } = useTaskActionHandlers();

  // handler for focusing SearchBar on press of CTRL + F
  const handleKeyDown = ( event: KeyboardEvent ) => {
    if ( event?.ctrlKey && event?.key.toLowerCase() === 'f' ) {
      event.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  // custom hook to add listener for CTRL + F to focus SearchBar
  useEventListener( { target: 'window', eventType: 'keydown', eventHandler: handleKeyDown } );

  return (
    <div className='relative w-full md:w-1/3 lg:w-1/4'>
      <input
        value={ searchText }
        ref={ searchInputRef }
        onChange={ ( e ) => handleSearchTasks( e.target.value ) }
        type='text'
        placeholder='Search...'
        className='w-full pl-10 pr-4 py-2 border-2 rounded-md outline-none focus:border-purple-400 peer'
      />
      <Search className='size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:scale-125 peer-focus:text-purple-500 transition-all duration-1000' />
    </div>
  );
};

export default SearchBar;