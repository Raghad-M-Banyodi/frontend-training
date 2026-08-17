import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskCard from './components/TaskCard';
import type { Task } from '../src/types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function handleDeleteCompleteTask() {
    const updatedTasks = tasks.filter(
      (task) => !task.completed
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleDeleteAll() {
    setTasks([]);
    saveTasks([]);
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <AddTask
        tasksList={tasks}
        setTasks={setTasks}
        saveTasks={saveTasks}
      />

      <TaskCard
        tasksList={tasks}
        setTasks={setTasks}
        saveTasks={saveTasks}
      />

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500"
          onClick={handleDeleteAll}
        >
          delete all
        </button>

        <button
          className="bg-stone-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700"
          onClick={handleDeleteCompleteTask}
        >
          delete complete task
        </button>
      </div>
    </div>
  );
}

export default App;