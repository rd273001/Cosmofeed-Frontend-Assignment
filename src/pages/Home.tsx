import { PlusIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import AddTaskForm from '../components/AddTaskForm';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import TaskTabs from '../components/TaskTabs';
import TaskList from '../components/TaskList';
import useModalVisibilityHandlers from '../hooks/useModalVisibilityHanlders';
import Spinner from '../components/Spinner';
import { Task } from '../types/task';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>( 'all' );

  const { tasks, handleAddTask, loading, groupBy } = useTaskActionHandlers();
  const { isAddTaskModalVisible, handleToggleModalVisibility } = useModalVisibilityHandlers();

  // Filter tasks based on active tab
  const filteredTasks = useMemo( () => {
    if ( groupBy ) {
      return ( tasks as Task[][] ).filter( ( group ) => {
        if ( activeTab === 'all' ) return true;
        if ( activeTab === 'completed' ) return group[0].currentState;
        return !group[0].currentState;
      } );
    }

    // filtered tasks when tasks are not grouped
    return ( tasks as Task[] ).filter( ( task ) => {
      if ( activeTab === 'all' ) return true;
      if ( activeTab === 'completed' ) return task.currentState;
      return !task.currentState;
    } );
  }, [tasks, activeTab] );

  return (
    <div className='container mx-auto'>
      <div className='p-4'>
        {/* TODO - Search & Group By Dropdown */ }

        <TaskTabs activeTab={ activeTab } onTabChange={ setActiveTab } />
        <TaskList tasks={ filteredTasks } />

        <button
          onClick={ () => handleToggleModalVisibility( 'AddTask' ) }
          className='fixed bottom-[6%] right-[3.5%] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-black/50 animate-[bounce_infinite_1.5s_ease-in-out] hover:animate-none bg-gradient-to-tr from-purple-800 to-blue-300 hover:opacity-75 active:scale-110'
        >
          <PlusIcon />
        </button>

        { isAddTaskModalVisible && <AddTaskForm modalType='AddTask' onSave={ handleAddTask } /> }
        { loading && <Spinner /> }
      </div>
    </div>
  )
};

export default Home;