import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Task } from '../types/task';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>( 'all' );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState( false );
  const [selectedTask, setSelectedTask] = useState<Task | null>( null );


  const openTaskModal = ( task?: Task ) => {
    setSelectedTask( task || null );
    setIsTaskModalOpen( true );
  };

  return (
    <div className='flex flex-col flex-1'>
      <Header />
      <div className="container mx-auto">
        <div className="p-4">
          {/* TODO - Search & Group By Dropdown */ }

          {/* TODO - Tabs */ }

          {/* TODO - Task list */ }

          {/* Add Task Button */ }

          <button
            onClick={ () => openTaskModal() }
            className="fixed bottom-6 right-6 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-black/50 animate-bounce hover:animate-none bg-gradient-to-tr from-purple-700 to-blue-600 hover:opacity-75 active:scale-110 transition-colors"
          >
            <PlusIcon />
          </button>

          {/* Task Modal */ }

        </div>
      </div>
    </div>
  )
};

export default Home;