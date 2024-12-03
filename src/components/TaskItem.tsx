import React from 'react';
import { Task } from "../types.ts";

interface TaskItemProps {
  task: Task;
  onChange: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onChange }) => {
  return (
    <li className="flex items-center h-[56px] ml-2">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={onChange}
        className="mr-4 w-4 h-4 rounded"
      />
      <span className="text-base font-normal">{task.description}</span>
    </li>
  );
};

export default TaskItem;