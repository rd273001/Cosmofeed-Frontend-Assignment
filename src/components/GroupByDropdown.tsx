import React from 'react';
import { GROUP_BY_DROPDOWN_VALUES, TASK_FIELDS } from '../config/taskConfig';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';

const GroupByDropdown: React.FC = () => {
  const { groupBy, handleSelectGroupBy } = useTaskActionHandlers();

  const groupByOptions = TASK_FIELDS
    .filter( field => field.allowGroupBy )
    .map( field => {
      switch ( field.name ) {
        case 'createdAt': return 'Created On';
        case 'dueDate': return 'Pending On';
        default: return field.name.charAt( 0 ).toUpperCase() + field.name.slice( 1 );
      }
    } );

  return (
    <select
      defaultValue={ groupBy ? GROUP_BY_DROPDOWN_VALUES[groupBy] : 'None' }
      onChange={ ( e ) => handleSelectGroupBy( e.target.value ) }
      className='border-2 rounded-md p-1.5 md:p-2 w-full md:w-1/3 lg:w-1/4'
    >
      <option disabled>Group By</option>
      <option value='None'>None</option>
      { groupByOptions.map( fieldName => (
        <option key={ fieldName } value={ fieldName }>
          { fieldName }
        </option>
      ) )
      }
    </select>
  );
};

export default GroupByDropdown;