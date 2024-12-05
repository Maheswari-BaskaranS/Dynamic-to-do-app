import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteTask, Task, updateTask } from "../features/tasks/taskSlice";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));
  const handleToggleComplete = () =>
    dispatch(updateTask({ ...task, completed: !task.completed }));

  return (
    // <div className="p-4 border rounded-md shadow-sm bg-white">
    //   <h3 className="text-lg font-bold">{task.title}</h3>
   
    //   <div className="flex items-center space-x-2">
    //       <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
    //     </div>
    //   <div className="mt-2 flex justify-between">
    //     <button
    //       onClick={handleToggleComplete}
    //       className="px-3 py-1 text-sm bg-green-500 text-white rounded-md"
    //     >
    //       {task.completed ? "Undo" : "Complete"}
    //     </button>
    //     <button
    //       onClick={() => onEdit(task)}  // Trigger edit on click
    //       className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md"
    //     >
    //       Edit
    //     </button>
    //     <button
    //       onClick={handleDelete}
    //       className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
    //     >
    //       Delete
    //     </button>
    //   </div>
    // </div>
    <div className="p-4 border rounded-md shadow-sm bg-white">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-bold">{task.title}</h3>
    <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
  </div>

  <div className="mt-2 flex justify-between">
    <button
      onClick={handleToggleComplete}
      className="px-3 py-1 text-sm bg-green-500 text-white rounded-md"
    >
      {task.completed ? "Undo" : "Complete"}
    </button>
    <button
      onClick={() => onEdit(task)}  // Trigger edit on click
      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md"
    >
      Edit
    </button>
    <button
      onClick={handleDelete}
      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
    >
      Delete
    </button>
  </div>
</div>

  );
};

export default TaskCard;
