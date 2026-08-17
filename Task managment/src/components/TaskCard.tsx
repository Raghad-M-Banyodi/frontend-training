import type { Task } from '../types/task';

interface TaskCardProps {
  tasksList: Task[];
  setTasks: (tasks: Task[]) => void;
  saveTasks: (tasks: Task[]) => void;
}

function TaskCard({
  tasksList,
  setTasks,
  saveTasks,
}: TaskCardProps) {
  function handleDelete(id: number) {
    const updatedTasks = tasksList.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleToggle(id: number) {
    const updatedTasks = tasksList.reduce<Task[]>((acc, task) => {
      if (task.id === id) {
        acc.push({
          ...task,
          completed: !task.completed,
        });
      } else {
        acc.push(task);
      }

      return acc;
    }, []);

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">
          List of Tasks
        </h2>

        <ul className="gap-y-3">
          {tasksList.map((task) => (
            <li
              className="flex items-center justify-between bg-[#FFFDF5] border border-stone-200 rounded-xl px-5 py-4 shadow-sm mt-2"
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
  );
}

export default TaskCard;