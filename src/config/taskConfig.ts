export interface TaskField {
  name: string;
  allowSort: boolean;
  allowSearch: boolean;
  allowGroupBy: boolean;
}

export const TASK_FIELDS: TaskField[] = [
  {
    name: 'currentState',
    allowSort: true,
    allowSearch: false,
    allowGroupBy: false
  },
  {
    name: 'title',
    allowSort: true,
    allowSearch: true,
    allowGroupBy: false
  },
  {
    name: 'description',
    allowSort: false,
    allowSearch: true,
    allowGroupBy: false
  },
  {
    name: 'createdAt',
    allowSort: true,
    allowSearch: false,
    allowGroupBy: true
  },
  {
    name: 'dueDate',
    allowSort: true,
    allowSearch: false,
    allowGroupBy: true
  },
  {
    name: 'priority',
    allowSort: true,
    allowSearch: false,
    allowGroupBy: true
  }
];

export const PRIORITY_OPTIONS = [
  'None',
  'Low',
  'Medium',
  'High'
];