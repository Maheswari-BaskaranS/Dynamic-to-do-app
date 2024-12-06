import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { Task } from "../features/tasks/taskSlice";

describe("TaskItem Component", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    category: "Pending",
    dueDate: "2024-12-15",
    completed: false,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it("renders task details correctly", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Due: 2024-12-15")).toBeInTheDocument();
  });

  it("calls onEdit when the Edit button is clicked", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when the Delete button is clicked", () => {
    render(<TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
