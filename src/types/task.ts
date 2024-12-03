export interface Task {
  id: string;
  currentState: boolean; // true = done, false = open
  title: string;
  description: string;
  createdAt: number; // timestamp
  dueDate?: number; // optional timestamp
  priority: 'None' | 'Low' | 'Medium' | 'High';
}

export interface TaskState {
  tasks: Task[];
  searchTerm: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  groupBy: string | null;
}