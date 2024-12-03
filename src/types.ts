interface Task {
  id: string;
  description: string;
  value: number;
  checked: boolean;
}

interface ProgressItem {
  id: string;
  name: string;
  tasks: Task[];
}

export type { Task, ProgressItem };