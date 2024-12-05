import React from "react";
import { Task } from "../features/tasks/taskSlice";
import TaskItem from "./TaskItem";

interface TaskListProps {
  title: string; 
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onEditTask, onDeleteTask }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3> {/* Display the title */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </ul>
    </div>
  );
};


export default TaskList;
