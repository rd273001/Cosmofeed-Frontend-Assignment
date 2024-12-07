import React from 'react';

interface TaskTabsProps {
  activeTab: 'all' | 'completed' | 'pending';
  onTabChange: (tab: 'all' | 'completed' | 'pending') => void;
}

const TaskTabs: React.FC<TaskTabsProps> = ( { activeTab, onTabChange } ) => {
  const tabs = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className='flex border-b mb-4'>
      { tabs.map( ( tab ) => (
        <button
          key={ tab.key }
          onClick={ () => onTabChange( tab.key as 'all' | 'completed' | 'pending' ) }
          className={ `
            px-4 py-2 border-b-2 
            ${activeTab === tab.key
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'}
          `}
        >
          { tab.label }
        </button>
      ) ) }
    </div>
  );
};

export default TaskTabs;