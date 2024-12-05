import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./taskSlice";

// Simulated API fetch
export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await new Promise<{ data: Task[] }>((resolve) =>
      setTimeout(() => resolve({ data: [] }), 1000)
    );
    return response.data;
  }
);
