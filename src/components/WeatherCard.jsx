import { CloudIcon, SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const WeatherCard = ({ weather, isLoading }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <SunIcon className="w-10 h-10 text-yellow-500" />;
      case 'clouds':
        return <CloudIcon className="w-10 h-10 text-gray-500" />;
      case 'thunderstorm':
        return <BoltIcon className="w-10 h-10 text-purple-500" />;
      default:
        return <CloudIcon className="w-10 h-10 text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Weather</h2>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-medium text-gray-900">
        Weather in {weather.name}
      </h2>
      
      <div className="flex items-center space-x-4">
        {getWeatherIcon(weather.weather[0]?.main)}
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(weather.main?.temp)}°C
          </p>
          <p className="text-sm text-gray-600 capitalize">
            {weather.weather[0]?.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Feels like:</span>
          <span className="font-medium">{Math.round(weather.main?.feels_like)}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Humidity:</span>
          <span className="font-medium">{weather.main?.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Wind:</span>
          <span className="font-medium">{weather.wind?.speed} m/s</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Pressure:</span>
          <span className="font-medium">{weather.main?.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;