import { useState, type KeyboardEvent } from 'react';
import type { Task } from '../types/task';

interface AddTaskProps {
  tasksList: Task[];
  setTasks: (tasks: Task[]) => void;
  saveTasks: (tasks: Task[]) => void;
}

function AddTask({
  tasksList,
  setTasks,
  saveTasks,
}: AddTaskProps) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  function addNewTask() {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    const updatedTasks = [...tasksList, newTask];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleAddTask() {
    if (taskText.trim() === '') {
      setError('Please enter the task');
      setTaskText('');
      return;
    }

    setError('');
    addNewTask();
    setTaskText('');
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-3">
        <div className="flex justify-center items-center gap-3 mb-10 mt-10">
          <input
            className="w-80 border border-stone-300 bg-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-stone-400"
            type="text"
            placeholder="New task..."
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            onKeyDown={onKeyDown}
          />

          <button
            className="bg-stone-700 text-white px-5 py-3 rounded-lg hover:bg-stone-800"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default AddTask;