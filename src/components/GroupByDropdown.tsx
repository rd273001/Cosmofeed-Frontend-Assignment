import React from 'react';
import { TASK_FIELDS } from '../config/taskConfig';
import useTaskActionHandlers from '../hooks/useTaskActionHandlers';

const GroupByDropdown: React.FC = () => {
  const { groupBy, handleSelectGroupBy } = useTaskActionHandlers();

  const groupByOptions = TASK_FIELDS
    .filter( field => field.allowGroupBy )
    .map( field => field.name );

  return (
    <select
      value={ groupBy || 'None' }
      onChange={ ( e ) => handleSelectGroupBy( e.target.value ) }
      className='border rounded-md p-2 w-full md:w-1/3 lg:w-1/4'
    >
      <option value='None'>Group By</option>
      { groupByOptions.map( option => (
        <option key={ option } value={ option }>
          { option.charAt( 0 ).toUpperCase() + option.slice( 1 ) }
        </option>
      ) ) }
    </select>
  );
};

export default GroupByDropdown;