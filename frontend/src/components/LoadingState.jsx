import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Activity, MapPin, Utensils } from 'lucide-react';

const LoadingState = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Sun, Cloud, CloudRain];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const SkeletonCard = ({ 
    icon: Icon, 
    title 
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-900">
      {/* Weather Animation */}
      <div className="text-center mb-12">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <CurrentIcon className="h-12 w-12 text-white animate-bounce" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-ping"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analyzing Weather Data
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Getting the best insights for your trip...
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentIcon === i ? 'bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Skeleton Preview Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonCard icon={Sun} title="Weather Forecast" />
        <SkeletonCard icon={Activity} title="Recommended Activities" />
        <SkeletonCard icon={Utensils} title="Local Restaurants" />
        <SkeletonCard icon={MapPin} title="Nearby Cities" />
        <SkeletonCard icon={Cloud} title="Air Quality" />
        <SkeletonCard icon={CloudRain} title="Travel Tips" />
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
          <span>This usually takes a few seconds...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;