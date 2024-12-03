import React from 'react';
import logo from '/src/assets/logo.svg';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className='p-4 shadow-md shadow-black/20'>
      <div className='flex flex-col md:flex-row justify-between md:items-center mx-auto max-w-screen-xl'>
        <a href='/' className='flex items-center md:mb-0 mb-4' aria-label='Homepage'>
          <img src={logo} alt='TODO logo' className='h-8 md:h-9 w-auto mr-2' />
          <h1 className='text-2xl md:text-3xl font-bold'>TODO</h1>
        </a>

        <div className='relative w-full md:w-1/3 lg:w-1/4'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400'
          />
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
            <Search className='h-5 w-5' />
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;