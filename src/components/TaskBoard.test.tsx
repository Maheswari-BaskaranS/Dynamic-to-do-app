import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskBoard from "./TaskBoard";
import { configureStore } from "@reduxjs/toolkit"; // Import from @reduxjs/toolkit
import taskReducer from "../features/tasks/taskSlice";
import { Task } from "../features/tasks/taskSlice";

interface RootState {
  tasks: {
    tasks: Task[];
    filteredTasks: Task[];
    filterText: string;
  };
}


const createTestStore = (initialState: RootState) =>
  configureStore({
    reducer: {
      tasks: taskReducer,
    },
    preloadedState: initialState,
  });

describe("TaskBoard Component", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "Task 1", category: "Pending", dueDate: "2024-12-15", completed: false },
    { id: "2", title: "Task 2", category: "In Progress", dueDate: "2024-12-20", completed: false },
    { id: "3", title: "Task 3", category: "Completed", dueDate: "2024-12-25", completed: true },
  ];

  it("renders task categories", () => {
    const store = createTestStore({
      tasks: {
        tasks: mockTasks,
        filteredTasks: mockTasks,
        filterText: "",
      },
    });

    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("opens Add Task modal on button click", () => {
    const store = createTestStore({
      tasks: {
        tasks: mockTasks,
        filteredTasks: mockTasks,
        filterText: "",
      },
    });

    render(
      <Provider store={store}>
        <TaskBoard />
      </Provider>
    );
    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByText("Add New Task")).toBeInTheDocument();
  });
});
