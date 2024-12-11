export interface Task {
  id: string;
  currentState: boolean; // true = done, false = open
  title: string;
  description: string;
  createdAt: number; // timestamp
  dueDate?: number; // optional timestamp
  priority: TaskPriority;
}

export type TaskPriority = 'None' | 'Low' | 'Medium' | 'High';

export interface TaskState {
  tasks: Task[];
  searchText: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  groupBy: string | null;
  loading?: boolean;
  selectedTask: Task | null;
  selectedTasksIds: string[];
}