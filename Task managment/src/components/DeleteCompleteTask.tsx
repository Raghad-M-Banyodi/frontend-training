interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface DeleteCompleteTaskProps {
  tasksList: Task[];
   setTasks: (tasks: Task[]) => void;
}
function DeleteCompleteTask({ tasksList, setTasks }: DeleteCompleteTaskProps) {
  function handleDeleteCompleteTask() {
    setTasks(tasksList.filter((task) => task.completed !== true));
  }
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        className="bg-stone-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700"
        onClick={() => handleDeleteCompleteTask()}
      >
        delete complete task
      </button>
    </div>
  );
}
export default DeleteCompleteTask;
