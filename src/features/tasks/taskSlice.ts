import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  category: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  filterText: string; // Add filterText to the state
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  filterText: "", // Initialize filterText
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.filteredTasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.filteredTasks.filter((task) => task.id !== action.payload);
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload; // Add an action to update the filter text
      state.filteredTasks = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.filterText.toLowerCase())
      );
      
    },
    reorderTasks(state, action: PayloadAction<{ category: string; sourceIndex: number; destinationIndex: number }>) {
      const { category, sourceIndex, destinationIndex } = action.payload;
      const tasksInCategory = state.tasks.filter((task) => task.category === category);
      const [removed] = tasksInCategory.splice(sourceIndex, 1);
      tasksInCategory.splice(destinationIndex, 0, removed);
      
      // Update the tasks with the new order
      state.tasks = [
        ...state.tasks.filter((task) => task.category !== category),
        ...tasksInCategory,
      ];
    },
  
  },
});

export const { addTask, updateTask, deleteTask, setFilterText,reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
