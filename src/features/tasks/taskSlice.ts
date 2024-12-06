import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  category: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  completed: boolean;
}
export type TaskCategory = "Pending" | "In Progress" | "Completed";

interface ReorderTaskPayload {
  sourceCategory: TaskCategory;
  destinationCategory: TaskCategory;
  sourceIndex: number;
  destinationIndex: number;
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
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload; // Update the tasks in the state with the new tasks array
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
    reorderTasks(state, action: PayloadAction<ReorderTaskPayload>) {
      const { sourceCategory, destinationCategory, sourceIndex, destinationIndex } = action.payload;
    
      // Filter tasks by category
      const sourceTasks = state.tasks.filter((task) => task.category === sourceCategory);
      const destinationTasks = state.tasks.filter((task) => task.category === destinationCategory);
    
      // Remove the task from the source category
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      movedTask.category = destinationCategory; // Now safe because we know destinationCategory is a valid category
    
      // Insert the task into the destination category
      destinationTasks.splice(destinationIndex, 0, movedTask);
    
      // Update the tasks array to reflect the new order
      const updatedTasks = state.tasks
        .filter((task) => task.category !== sourceCategory && task.category !== destinationCategory) // Exclude the categories from the old lists
        .concat(sourceTasks) // Add the updated source tasks
        .concat(destinationTasks); // Add the updated destination tasks
    
      // Update the tasks in the store
      state.tasks = updatedTasks;
    
      // Optionally, update filteredTasks if needed
      if (state.filterText) {
        state.filteredTasks = state.tasks.filter((task) =>
          task.title.toLowerCase().includes(state.filterText.toLowerCase())
        );
      }
    }
    
  
  },
});

export const { addTask, updateTask,updateTasks, deleteTask, setFilterText,reorderTasks } = taskSlice.actions;
export default taskSlice.reducer;
