import { Utensils, Star, ExternalLink } from 'lucide-react';

const RestaurantsCard = ({ restaurants }) => {
  const getCuisineColor = (cuisine ) => {
    const cuisineColors ={
      'south indian': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'north indian': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'chinese': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'italian': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'continental': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'american': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    };
    
    return cuisineColors[cuisine.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getRatingColor = (rating) => {
    const ratingNum = parseFloat(rating);
    if (ratingNum >= 4.5) return 'text-green-600';
    if (ratingNum >= 4.0) return 'text-yellow-600';
    if (ratingNum >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3">
          <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Local Restaurants
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Top-rated dining options nearby
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {restaurants.map((restaurant, index) => (
          <div 
            key={index} 
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {restaurant.name}
                </h4>
                <div className="flex items-center mt-1">
                  <Star className={`h-4 w-4 mr-1 ${getRatingColor(restaurant.rating)}`} fill="currentColor" />
                  <span className={`font-medium ${getRatingColor(restaurant.rating)}`}>
                    {restaurant.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">rating</span>
                </div>
              </div>
              
              <a
                href={restaurant.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium group-hover:scale-105"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View on Maps
              </a>
            </div>
            
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCuisineColor(restaurant.cuisine)}`}>
                {restaurant.cuisine}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-300">
          🍽️ <strong>Recommendation:</strong> Make reservations in advance for popular restaurants, especially during peak hours.
        </p>
      </div>
    </div>
  );
};

export default RestaurantsCard;