import React from 'react';
import { ArrowLeft } from 'lucide-react';
import WeatherCard from './WeatherCard';
import ActivitiesCard from './ActivitiesCard';
import RestaurantsCard from './RestaurantsCard';
import AdditionalInfoCard from './AdditionalInfoCard';


const ResultsPage = ({ 
  weatherData, 
  location, 
  date, 
  onBack 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Search
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Weather & Travel Plan
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-300 gap-2">
              <span className="flex items-center">
                📍 <span className="ml-2 font-medium">{location}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                📅 <span className="ml-2 font-medium">{formatDate(date)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="space-y-8">
          {/* Weather Information */}
          <WeatherCard 
            weather={weatherData.weather}
            air_quality={weatherData.air_quality}
            best_time_to_visit={weatherData.best_time_to_visit}
          />

          {/* Activities and Restaurants */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivitiesCard activities={weatherData.activities} />
            <RestaurantsCard restaurants={weatherData.restaurants} />
          </div>

          {/* Additional Information */}
          <AdditionalInfoCard 
            nearbyCities={weatherData.nearbyCities}
            emergency={weatherData.emergency}
            travel_tips={weatherData.travel_tips}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Ready for Your Trip?</h3>
            <p className="text-blue-100 dark:text-blue-200 mb-4">
              Save this information and have a wonderful time exploring!
            </p>
            <button
              onClick={onBack}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Plan Another Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;