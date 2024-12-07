import React from 'react';
import logo from '/src/assets/logo.svg';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  return (
    <header className='p-4 shadow-md shadow-black/20'>
      <div className='flex flex-col md:flex-row justify-between md:items-center mx-auto max-w-screen-xl'>
        <a href='/' className='flex items-center md:mb-0 mb-4' aria-label='Homepage'>
          <img src={ logo } alt='TODO logo' className='h-8 md:h-9 mr-2' />
          <h1 className='text-2xl md:text-3xl font-bold'>TODO</h1>
        </a>

        <SearchBar />
      </div>
    </header>
  )
};

export default Header;