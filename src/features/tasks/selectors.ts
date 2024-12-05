import { RootState } from "../../store";

export const selectFilteredTasks = (state: RootState) => {
    const { tasks, filterText } = state.tasks;
    if (!filterText) return tasks; // If no filterText, return all tasks
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(filterText.toLowerCase()) // Filter by title
    );
  };
  