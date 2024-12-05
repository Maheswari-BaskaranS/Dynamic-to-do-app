import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateTask, Task } from "../features/tasks/taskSlice";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null; // Task to be edited (can be null initially)
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Pending" | "In Progress" | "Completed">("Pending");
  const [dueDate, setDueDate] = useState("");

  // Update state when the task prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = () => {
    if (title.trim() && dueDate.trim()) {
      // Dispatch the updateTask action
      dispatch(
        updateTask({
          id: task!.id, // Ensure task is not null using `!`
          title,
          category,
          dueDate,
          completed: task!.completed, // Preserve the current completed status
        })
      );
      onClose(); // Close the modal after submission
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (!isOpen || !task) return null; // Don't render if modal is closed or task is null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
