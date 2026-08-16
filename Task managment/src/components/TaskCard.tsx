import type { Dispatch, SetStateAction } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskCardProps {
  tasksList: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

function TaskCard({ tasksList, setTasks }: TaskCardProps) {
  function handleDelete(id: number) {
    setTasks(tasksList.filter((task) => task.id !== id));
  }

  function handleToggle(id: number) {
    setTasks(
      tasksList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className=" py-10 px-4">
      <div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">
            List of Tasks
          </h2>

          <ul className="gap-y-3">
            {tasksList.map((task) => (
              <li
                className="flex items-center justify-between bg-[#FFFDF5] border border-stone-200 rounded-xl px-5 py-4 shadow-sm"
                key={task.id}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    className="w-5 h-5 accent-stone-600 cursor-pointer"
                  />

                  <span
                    className={
                      task.completed
                        ? 'line-through text-stone-400'
                        : 'text-stone-800'
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  className="bg-stone-700 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-stone-800"
                  onClick={() => handleDelete(task.id)}
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
