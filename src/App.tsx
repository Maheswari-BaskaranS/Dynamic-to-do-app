import React from "react";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Dynamic To-Do Application</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
