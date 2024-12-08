import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className='fixed z-50 backdrop-blur-[1.5px] bg-slate-950/60 inset-0 m-auto flex flex-1 items-center justify-center'>
      <div className='flex items-center justify-center p-4 rounded-xl bg-white'>
      <hr className='border-[6px] size-11 animate-[spin_600ms_linear_infinite] border-gray-300 border-t-purple-600 rounded-full' />
      </div>
    </div>
  );
};

export default Spinner;