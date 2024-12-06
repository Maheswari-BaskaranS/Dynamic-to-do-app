import React from "react";
import { Task } from "../features/tasks/taskSlice";
import TaskItem from "./TaskItem";
import { Draggable } from "react-beautiful-dnd";

interface TaskListProps {
  title: string; 
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onEditTask, onDeleteTask }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3> 
      <ul className="space-y-4">
        {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
              >
          <TaskItem key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
          </li>
            )}
          </Draggable>

        ))}
      </ul>
    </div>
  );
};


export default TaskList;
