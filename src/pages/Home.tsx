import { PlusIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { Task } from '../types/task';
import Header from '../components/Header';
import Modal from '../components/Modal';
import AddTaskForm from '../components/AddTaskForm';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import TaskTabs from '../components/TaskTabs';
import TaskList from '../components/TaskList';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>( 'all' );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState( false );
  const [selectedTask, setSelectedTask] = useState<Task | null>( null );

  const { tasks, handleAddTask, handleUpdateTask, } = useTaskActionHandlers();

  // Filter tasks based on active tab
  const filteredTasks = useMemo( () => {
    return tasks.filter( task => {
      if ( activeTab === 'all' ) return true;
      if ( activeTab === 'completed' ) return task.currentState;
      return !task.currentState;
    } );
  }, [tasks, activeTab] );

  const openTaskModal = ( task?: Task ) => {
    setSelectedTask( task || null );
    setIsTaskModalOpen( true );
  };

  const closeTaskModal = () => {
    setSelectedTask( null );
    setIsTaskModalOpen( false );
  };

  const handleSaveTask = ( task: Omit<Task, 'id' | 'currentState' | 'createdAt'> ) => {
    if ( selectedTask ) {
      // Update existing task
      handleUpdateTask( { ...selectedTask, ...task } );
    } else {
      // Add new task
      handleAddTask( task );
    }
    closeTaskModal();
  };

  return (
    <div className='flex flex-col flex-1'>
      <Header />
      <div className='container mx-auto'>
        <div className='p-4'>
          {/* TODO - Search & Group By Dropdown */ }

          <TaskTabs activeTab={ activeTab } onTabChange={ setActiveTab } />

          <TaskList tasks={ filteredTasks } />

          {/* Add Task Button */ }

          <button
            onClick={ () => openTaskModal() }
            className='fixed bottom-6 right-6 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-black/50 animate-bounce hover:animate-none bg-gradient-to-tr from-purple-800 to-blue-300 hover:opacity-75 active:scale-110 transition-colors'
          >
            <PlusIcon />
          </button>

          { isTaskModalOpen && <Modal
            onClose={ () => setIsTaskModalOpen( false ) }
            children={ <AddTaskForm onSave={ handleSaveTask } onClose={ closeTaskModal } /> }
          />
          }
        </div>
      </div>
    </div>
  )
};

export default Home;