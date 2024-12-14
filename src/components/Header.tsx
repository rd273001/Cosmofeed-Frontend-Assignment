import React from 'react';
import logo from '/src/assets/logo.svg';
import SearchBar from './SearchBar';
import GroupByDropdown from './GroupByDropdown';

const Header: React.FC = () => {
  return (
    <header className='p-3 md:p-4 shadow-lg shadow-black/20 bg-white text-sm sm:text-base'>
      <div className='flex flex-col md:flex-row justify-between md:items-center mx-auto gap-3 max-w-screen-xl'>
        <a href='/' className='flex items-center' aria-label='Homepage'>
          <img src={ logo } alt='TODO logo' className='h-7 md:h-9 mr-2' />
          <h1 className='text-xl md:text-2xl font-bold'>TODO</h1>
        </a>

        <SearchBar />

        <GroupByDropdown />
      </div>
    </header>
  )
};

export default Header;