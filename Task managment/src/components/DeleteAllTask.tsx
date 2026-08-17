
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface DeleteAllTaskProps {
  tasksList: Task[];
  setTasks: (tasks: Task[]) => void;
}

function DeleteAllTask({ tasksList, setTasks }: DeleteAllTaskProps) {
  function handleDeleteAll() {
    setTasks([]);
  }
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        className="bg-red-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500"
        onClick={() => handleDeleteAll()}
      >
        delete all
      </button>
    </div>
  );
}
export default DeleteAllTask;
