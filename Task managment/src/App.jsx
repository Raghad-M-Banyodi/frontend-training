import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskCard from './components/TaskCard';
import DeleteAllTask from './components/DeleteAllTask';
import DeleteCompleteTask from './components/DeleteCompleteTask';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <AddTask tasksList={tasks} setTasks={setTasks} />
      <TaskCard tasksList={tasks} setTasks={setTasks} />
      <div className="flex justify-center items-center gap-4 mt-6">
        <DeleteAllTask tasksList={tasks} setTasks={setTasks} />
        <DeleteCompleteTask tasksList={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
