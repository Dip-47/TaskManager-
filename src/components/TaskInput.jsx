import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const TaskInput = ({ onAddTask, isLoading }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ title, priority });
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskInput;