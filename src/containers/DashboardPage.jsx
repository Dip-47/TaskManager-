import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store/taskSlice';
import { fetchWeather } from '../store/weatherSlice';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import WeatherCard from '../components/WeatherCard';
import LogoutButton from '../components/LogoutButton';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading: tasksLoading } = useSelector((state) => state.tasks);
  const { data: weather, isLoading: weatherLoading } = useSelector((state) => state.weather);
  const { user } = useSelector((state) => state.auth);

  // Check for outdoor tasks and fetch weather if found
  useEffect(() => {
    const hasOutdoorTask = tasks.some(task => 
      task.title.toLowerCase().includes('outdoor') || 
      task.title.toLowerCase().includes('outside')
    );
    
    if (hasOutdoorTask) {
      dispatch(fetchWeather('London')); // Default location
    }
  }, [tasks, dispatch]);

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.username || 'User'}!
        </h1>
        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <TaskInput onAddTask={handleAddTask} isLoading={tasksLoading} />
          <TaskList 
            tasks={tasks} 
            onDeleteTask={handleDeleteTask} 
            isLoading={tasksLoading}
          />
        </div>

        <div className="md:col-span-1">
          {weather && (
            <WeatherCard 
              weather={weather} 
              isLoading={weatherLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;