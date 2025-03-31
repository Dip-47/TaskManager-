const API_KEY = 'b6907d289e10d714a6e88b30761fae22'; // Free tier API key
const BASE_URL = 'https://openweathermap.org/data/2.5';

export const getWeatherData = async (location) => {
  try {
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response structure similar to OpenWeatherMap API
    return {
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      main: {
        temp: 22.5,
        feels_like: 23.1,
        temp_min: 21.0,
        temp_max: 24.0,
        humidity: 65
      },
      wind: {
        speed: 3.1,
        deg: 240
      },
      name: location || 'London'
    };

    // In a real implementation, you would use:
    // const response = await fetch(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
    // if (!response.ok) throw new Error('Weather data not found');
    // return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};