import React from "react";
import { Task } from "../features/tasks/taskSlice";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    return (
        <li className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
            <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            </div>
            <div className="flex space-x-2">
                <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>
                <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onDelete(task.id)} // Call delete callback
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
