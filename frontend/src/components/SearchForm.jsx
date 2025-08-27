import React, { useState } from 'react';
import { MapPin, Calendar, Search, Navigation } from 'lucide-react';
import { getCurrentLocation } from '../utils/geolocation';
import { reverseGeocode } from '../utils/reverseGeocode'; // adjust path

const SearchForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    useCurrentLocation: false,
    latitude: undefined,
    longitude: undefined
  });
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.useCurrentLocation && !formData.location.trim()) {
      newErrors.location = 'Please enter a location or use current location';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    setErrors({});
    // PASS the whole object (so mockApi can use latitude/longitude if present)
    onSubmit(formData);
  };

  // New: detect current location
  const handleDetectLocationClick = async () => {
    // If already detecting, do nothing
    if (detectingLocation) return;

    setDetectingLocation(true);
    setErrors(prev => ({ ...prev, location: null }));

    try {
      const coords = await getCurrentLocation();
      console.log('Detected coordinates:', coords);
      // optional: set a readable string; you can also reverse-geocode later
      const coordsText = `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`;
        const {placeName}= await reverseGeocode(coords.latitude,coords.longitude);
        console.log("Lattitude and longitude reverse geocoded place name",placeName);
      setFormData(prev => ({
        ...prev,
        useCurrentLocation: true,
        location: placeName, // show something to user (or replace with reverse-geocoded name)
        latitude: coords.latitude,
        longitude: coords.longitude
      }));
    } catch (err) {
      console.error('Could not get location:', err);
      setErrors(prev => ({ ...prev, location: 'Unable to detect your location. Please enter it manually.' }));
      setFormData(prev => ({
        ...prev,
        useCurrentLocation: false,
        latitude: undefined,
        longitude: undefined,
        location: ''
      }));
    } finally {
      setDetectingLocation(false);
    }
  };

  // If user types manually, clear coords and disable useCurrentLocation
  const handleLocationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      location: value,
      useCurrentLocation: false,
      latitude: undefined,
      longitude: undefined
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 ${isShaking ? 'animate-pulse scale-[0.98]' : 'scale-100'}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Get Your Weather Plan</h2>
          <p className="text-gray-600 dark:text-gray-300">Tell us where and when you're planning to visit</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Enter city, address, or place..."
                disabled={isLoading || detectingLocation}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.location ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'}`}
              />
            </div>
            {errors.location && <p className="text-sm text-red-600 dark:text-red-400 flex items-center"><span className="mr-1">⚠️</span> {errors.location}</p>}
          </div>

          {/* Use Current Location Button (new behavior) */}
          <button
            type="button"
            onClick={handleDetectLocationClick}
            disabled={isLoading || detectingLocation}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${formData.useCurrentLocation ? 'bg-blue-100 text-blue-700 border-2 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}`}
          >
            <Navigation className={`mr-2 h-5 w-5 ${(detectingLocation || formData.useCurrentLocation) ? 'animate-pulse' : ''}`} />
            {detectingLocation ? 'Detecting location...' : formData.useCurrentLocation ? 'Using Current Location' : 'Use My Current Location'}
          </button>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                min={today}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.date ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'}`}
              />
            </div>
            {errors.date && <p className="text-sm text-red-600 dark:text-red-400 flex items-center"><span className="mr-1">⚠️</span> {errors.date}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Getting Your Plan...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Get My Weather Plan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
