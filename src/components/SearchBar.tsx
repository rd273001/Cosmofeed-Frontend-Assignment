import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchTem, setSearchTerm] = useState( '' );

  return (
    <div className='relative w-full md:w-1/3 lg:w-1/4'>
      <input
        value={ searchTem }
        onChange={ ( e ) => setSearchTerm( e.target.value ) }
        type='text'
        placeholder='Search...'
        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400'
      />
      <Search className='size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
    </div>
  );
};

export default SearchBar;