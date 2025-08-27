import React from 'react';
import { Activity, Clock, MapPin } from 'lucide-react';

const ActivitiesCard = ({ activities }) => {
  const getActivityIcon = (type) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500'
    ];
    return colors[Math.abs(type.length) % colors.length];
  };

  const getBestTimeColor = (time) => {
    const timeLower = time.toLowerCase();
    if (timeLower.includes('morning')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (timeLower.includes('afternoon')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    if (timeLower.includes('evening')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
          <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Recommended Activities
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {activities.length} suggestions for your visit
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start">
                <div className={`w-10 h-10 ${getActivityIcon(activity.type)} rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {activity.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {activity.type}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBestTimeColor(activity.best_time)}`}>
                Best time: {activity.best_time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Tip:</strong> Check local weather conditions and opening hours before visiting any outdoor activities.
        </p>
      </div>
    </div>
  );
};

export default ActivitiesCard;