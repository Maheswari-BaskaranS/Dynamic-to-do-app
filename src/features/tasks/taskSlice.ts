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
  filterText: string; 
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  filterText: "", 
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
      state.tasks = action.payload; 
      state.filteredTasks = action.payload.filter((task) =>
        task.title.toLowerCase().includes(state.filterText.toLowerCase())
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = state.filteredTasks.filter((task) => task.id !== action.payload);
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload; 
      state.filteredTasks = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.filterText.toLowerCase())
      );
      
    },
    reorderTasks(state, action: PayloadAction<ReorderTaskPayload>) {
      const { sourceCategory, destinationCategory, sourceIndex, destinationIndex } = action.payload;
    
      const sourceTasks = state.tasks.filter((task) => task.category === sourceCategory);
      const destinationTasks = state.tasks.filter((task) => task.category === destinationCategory);
    
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      movedTask.category = destinationCategory; 

      destinationTasks.splice(destinationIndex, 0, movedTask);
    
      const updatedTasks = state.tasks
        .filter((task) => task.category !== sourceCategory && task.category !== destinationCategory) 
        .concat(sourceTasks) 
        .concat(destinationTasks); 
    
      state.tasks = updatedTasks;
    
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
