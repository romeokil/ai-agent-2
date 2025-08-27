import React from 'react';
import { MapPin, Phone, Lightbulb, Navigation } from 'lucide-react';

const AdditionalInfoCard = ({
  nearbyCities,
  emergency,
  travel_tips
}) => {
  return (
    <div className="space-y-6">
      {/* Nearby Cities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
            <Navigation className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Nearby Cities
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nearbyCities.map((city, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {city.name}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {city.distance_km} km
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Travel Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
              <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Emergency Information
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300 mb-1">
                <strong>Nearest Hospital</strong>
              </p>
              <p className="text-red-700 dark:text-red-200">
                {emergency.nearest_hospital}
              </p>
            </div>
            
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300 mb-1">
                <strong>Emergency Contact</strong>
              </p>
              <p className="text-red-700 dark:text-red-200 font-mono">
                {emergency.contact_number}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mr-3">
              <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Travel Tips
            </h3>
          </div>
          
          <div className="space-y-2">
            {travel_tips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <span className="text-yellow-600 dark:text-yellow-400 mr-2 text-sm">
                  💡
                </span>
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoCard;