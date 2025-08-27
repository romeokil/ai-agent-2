import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset,
  Activity,
  AlertTriangle
} from 'lucide-react';

const WeatherCard = ({ weather, air_quality, best_time_to_visit }) => {
  const getWeatherIcon = (condition ) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="h-12 w-12 text-yellow-500" />;
    }
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="h-12 w-12 text-blue-500" />;
    }
    return <Cloud className="h-12 w-12 text-gray-500" />;
  };

  const getAQIColor = (aqi ) => {
    const aqiNum = parseInt(aqi);
    if (aqiNum <= 50) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (aqiNum <= 100) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    if (aqiNum <= 150) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  const getAQILabel = (aqi ) => {
    const aqiNum = parseInt(aqi);
    if (aqiNum <= 50) return 'Good';
    if (aqiNum <= 100) return 'Moderate';
    if (aqiNum <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Current Weather</h3>
            <p className="text-blue-100 dark:text-blue-200">Real-time conditions</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Temperature</p>
                <p className="text-2xl font-bold">{weather.temp}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Droplets className="h-5 w-5 mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Humidity</p>
                <p className="text-lg font-semibold">{weather.humidity}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Wind className="h-5 w-5 mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Wind Speed</p>
                <p className="text-lg font-semibold">{weather.wind_speed}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-3 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">Condition</p>
                <p className="text-lg font-semibold">{weather.condition}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-400/30">
          <div className="flex justify-between text-sm text-blue-100">
            <div className="flex items-center">
              <Sunrise className="h-4 w-4 mr-2" />
              <span>Sunrise: {weather.sunrise}</span>
            </div>
            <div className="flex items-center">
              <Sunset className="h-4 w-4 mr-2" />
              <span>Sunset: {weather.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Air Quality Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Air Quality</h4>
          
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getAQIColor(air_quality.aqi)}`}>
            AQI: {air_quality.aqi} - {getAQILabel(air_quality.aqi)}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">PM2.5</span>
              <span className="font-medium text-gray-900 dark:text-white">{air_quality.pm2_5}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">PM10</span>
              <span className="font-medium text-gray-900 dark:text-white">{air_quality.pm10}</span>
            </div>
          </div>
        </div>

        {/* Best Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Time to Visit</h4>
          
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {best_time_to_visit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;