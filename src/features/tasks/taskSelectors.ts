import { RootState } from "../../store";

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectFilteredTasks = (state: RootState) => {
  const { tasks, filterText } = state.tasks;
  if (!filterText) return tasks;
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );
};
