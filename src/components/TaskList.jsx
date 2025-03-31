import { TrashIcon } from '@heroicons/react/24/outline';

const TaskList = ({ tasks, onDeleteTask, isLoading }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">Your Tasks</h2>
      
      {isLoading && tasks.length === 0 ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="py-4 text-center text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`p-3 rounded-md ${task.priority}-priority transition-colors duration-200 hover:bg-gray-50`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-gray-800">{task.title}</span>
                </div>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1 text-gray-400 rounded-md hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Delete task"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;