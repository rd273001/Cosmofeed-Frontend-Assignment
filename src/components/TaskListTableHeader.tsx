import React from 'react';
import { TASK_FIELDS } from '../config/taskConfig';
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';


const TaskListTableHeader: React.FC = () => {
  const { handleSortColumn } = useTaskActionHandlers();
  const sortableColumns = TASK_FIELDS.filter( field => field.allowSort );
  return (
    <thead>
      <tr className='bg-gray-200'>
        { ['Summary', 'Priority', 'Created On', 'Due Date', 'Actions'].map( ( header ) => {
          const matchingField = sortableColumns.find( field => {
            switch ( header ) {
              case 'Summary': return field.name === 'title';
              case 'Priority': return field.name === 'priority';
              case 'Created On': return field.name === 'createdAt';
              case 'Due Date': return field.name === 'dueDate';
              default: return 'Actions';
            }
          } );

          return (
            <th
              key={ header }
              className='p-2 border group'
              onClick={ () => matchingField && handleSortColumn( matchingField.name ) }
            >
              { matchingField && (
                <div className='flex gap-2 justify-center items-center'>
                  { header }
                  <div className='hidden group-hover:flex gap-1 justify-center items-center'>
                  <ChevronUpCircle className='w-3 h-3 text-gray-400 cursor-pointer' />
                    <ChevronDownCircle className='w-3 h-3 text-gray-400 cursor-pointer' />
                    </div>
                </div>
              ) }
            </th>
          );
        } ) }
      </tr>
    </thead>
  );
};

export default TaskListTableHeader;