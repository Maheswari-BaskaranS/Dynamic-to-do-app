import React, { useState } from "react";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import AddTaskModal from "./AddTaskModal";
import { useAppSelector } from "../hooks/useAppSelector";
import EditTaskModal from "./EditTaskModal";
import { deleteTask, setFilterText, Task } from "../features/tasks/taskSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { selectFilteredTasks } from "../features/tasks/taskSelectors";

const TaskBoard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
 const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectFilteredTasks);

  const groupedTasks = {
    Pending: tasks.filter((task) => task.category === "Pending"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Completed: tasks.filter((task) => task.category === "Completed"),
  };

  const handleEditTask = (task:Task) => {
    setEditTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterText(e.target.value)); // Update the filterText in Redux state
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen"> 
      <SearchBar />
      <button
        className="mb-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={() => setModalOpen(true)}
      >
        Add Task
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.keys(groupedTasks).map((category) => (
          <div key={category} className="bg-white shadow-md rounded-lg p-4">
          <h2
            className={`text-lg font-semibold mb-4 text-center ${
              category === "Pending"
                ? "text-yellow-500"
                : category === "In Progress"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {category}
          </h2>
         <TaskList
            key={category}
            title={category}
            tasks={groupedTasks[category as keyof typeof groupedTasks]} // Explicitly tell TypeScript the key is valid
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask} 
          />
          </div>
        ))}
      </div>
      <AddTaskModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={editTask}
      />
    </div>
  );
};

export default TaskBoard;
