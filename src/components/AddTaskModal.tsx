import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addTask } from "../features/tasks/taskSlice";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Pending" | "In Progress" | "Completed">("Pending");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (title && dueDate) {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title,
          category,
          dueDate,
          completed: category === "Completed",
        })
      );
      setTitle("");
      setCategory("Pending");
      setDueDate("");
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-black p-2 rounded-md mt-2 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
