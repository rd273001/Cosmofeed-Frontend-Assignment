import React from 'react';
import { TASK_FIELDS } from '../config/taskConfig';
import { ArrowDownCircle, ArrowUpCircle, CheckSquare, Square } from 'lucide-react';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';
import useBulkTaskActions from '../hooks/useBulkTaskActions';
import { Task } from '../types/task';

const TaskListTableHeader: React.FC = () => {
  const { tasks, handleSortColumn, sortColumn, sortDirection } = useTaskActionHandlers();
  const sortableColumns = TASK_FIELDS.filter( field => field.allowSort );
  const { selectedTasksIds, handleSelectAllTasks, handleClearSelectedTasks } = useBulkTaskActions();

  // Flatten tasks if grouped
  const allTasks = Array.isArray( tasks[0] ) ? tasks.flat() : tasks;

  const isAllSelected = allTasks.length > 0 && selectedTasksIds.length === allTasks.length;
  // const isSomeSelected = selectedTasksIds.length > 0 && selectedTasksIds.length < allTasks.length;

  const headerMapping = {
    'title': 'Summary',
    'priority': 'Priority',
    'createdAt': 'Created On',
    'dueDate': 'Pending On'
  };

  return (
    <thead>
      <tr className='bg-gray-300'>
        <th className='p-2 border border-gray-400 cursor-pointer group' onClick={ () => isAllSelected ? handleClearSelectedTasks() : handleSelectAllTasks( allTasks as Task[] ) }>
          { isAllSelected ?
            <CheckSquare
              onClick={ () => handleClearSelectedTasks() }
              className='size-5 text-purple-600 fill-white group-hover:text-purple-400'
            /> :
            <Square
              onClick={ () => handleSelectAllTasks( allTasks as Task[] ) }
              className='size-5 text-gray-400 fill-white group-hover:text-purple-600'
            />
          }
        </th>

        { Object.entries( headerMapping ).map( ( [fieldName, header] ) => {
          const matchingField = sortableColumns.find( field => field.name === fieldName );

          return (
            <th
              key={ header }
              className={ `${sortColumn === fieldName
                ? 'bg-gray-200 border-purple-400 font-bold'
                : ''}
                font-semibold border border-gray-400 hover:bg-gray-200 hover:border-purple-400 p-2 transition-colors duration-300 cursor-pointer` }
              onClick={ () => matchingField && handleSortColumn( fieldName ) }
            >
              <div className='flex items-center justify-center gap-2'>
                <span>{ header }</span>
                { matchingField && sortColumn && (
                  <div className='flex gap-1'>
                    <ArrowUpCircle className={ `size-5 ${sortColumn === fieldName && sortDirection === 'asc' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-500` } />
                    <ArrowDownCircle className={ `size-5 ${sortColumn === fieldName && sortDirection === 'desc' ? 'text-purple-600' : 'text-gray-400'} hover:text-purple-500` } />
                  </div>
                ) }
              </div>
            </th>
          );
        } ).concat(
          <th key='actions' className='border border-gray-400 font-semibold p-2 transition-colors duration-300'>Actions</th>
        ) }
      </tr>
    </thead>
  );
};

export default TaskListTableHeader;