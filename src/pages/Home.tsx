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

  const { tasks, loading, groupBy } = useTaskActionHandlers();
  const { isAddTaskModalVisible, handleToggleModalVisibility } = useModalVisibilityHandlers();

  const filteredTasks = useMemo( () => {
    if ( groupBy ) {
      return ( tasks as Task[][] ).map( group => {
        // For grouped tasks, filter within each group based on the active tab
        const filteredGroup = group.filter( task => {
          if ( activeTab === 'all' ) return true;
          if ( activeTab === 'completed' ) return task.currentState;
          return !task.currentState;
        } );

        // If the filtered group is not empty, return it
        return filteredGroup.length > 0 ? filteredGroup : null;
      } ).filter( group => group !== null ) as Task[][];
    }

    // Non-grouped tasks filtering remains the same
    return ( tasks as Task[] ).filter( ( task ) => {
      if ( activeTab === 'all' ) return true;
      if ( activeTab === 'completed' ) return task.currentState;
      return !task.currentState;
    } );
  }, [tasks, activeTab, groupBy] );

  return (
    <div className='container mx-auto flex flex-col flex-1 overflow-auto text-sm sm:text-base'>
      <div className='p-4 mb-6'>

        <TaskTabs activeTab={ activeTab } onTabChange={ setActiveTab } />
        <TaskList tasks={ filteredTasks } />

        <button
          onClick={ () => handleToggleModalVisibility( 'AddTask' ) }
          className='fixed md:bottom-[6%] md:right-[3.5%] bottom-[5%] right-[6%] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-black/50 animate-[bounce_infinite_1.5s_ease-in-out] hover:animate-none bg-gradient-to-tr from-violet-950 to-purple-500 hover:from-violet-800 hover:to-purple-400'
        >
          <PlusIcon />
        </button>

        { isAddTaskModalVisible && <AddTaskForm modalType='AddTask' /> }
        { loading && <Spinner /> }
      </div>
    </div>
  )
};

export default Home;