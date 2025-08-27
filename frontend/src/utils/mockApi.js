import { getCurrentLocation } from "./geolocation";
// API function to fetch weather data from the backend
export const fetchWeatherData = async (formData)=> {
    console.log("jo hmlog app.jsx se location and date",formData);
  try {
    let requestPayload = {
      date: formData.date,
      location:formData.location
    };
    console.log("Request Payload before embedding location:", requestPayload);
    // // Handle location - either use current location or provided location
    //  if (formData.useCurrentLocation) {
    //   // If front-end already has coords, use them (no extra permission prompt)
    //   if (formData.latitude && formData.longitude) {
    //     requestPayload.latitude = formData.latitude;
    //     requestPayload.longitude = formData.longitude;
    //     requestPayload.useCurrentLocation = true;
    //   } else {
    //     // Fallback: ask browser here (only if front-end didn't provide coords)
    //     const coords = await getCurrentLocation();
    //     requestPayload.latitude = coords.latitude;
    //     requestPayload.longitude = coords.longitude;
    //     requestPayload.useCurrentLocation = true;
    //   }
    // } else {
    //   requestPayload.location = formData.location;
    //   requestPayload.useCurrentLocation = false;
    // }
    console.log('Request Payload after embedding location:', requestPayload);

    // Make API call to the backend
    const response = await fetch('https://ai-agent-2-h19p.onrender.com/weather-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        errorData.error || 
        `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from server');
    }

    // Ensure all required fields are present with fallbacks
    const weatherData = {
      weather: {
        temp: data.weather?.temp || 'N/A',
        condition: data.weather?.condition || 'Unknown',
        humidity: data.weather?.humidity || 'N/A',
        wind_speed: data.weather?.wind_speed || 'N/A',
        sunrise: data.weather?.sunrise || 'N/A',
        sunset: data.weather?.sunset || 'N/A'
      },
      air_quality: {
        aqi: data.air_quality?.aqi || 'N/A',
        pm2_5: data.air_quality?.pm2_5 || 'N/A',
        pm10: data.air_quality?.pm10 || 'N/A'
      },
      best_time_to_visit: data.best_time_to_visit || 'Information not available',
      nearbyCities: Array.isArray(data.nearbyCities) ? data.nearbyCities : [],
      activities: Array.isArray(data.activities) ? data.activities : [],
      restaurants: Array.isArray(data.restaurants) ? data.restaurants : [],
      emergency: {
        nearest_hospital: data.emergency?.nearest_hospital || 'Information not available',
        contact_number: data.emergency?.contact_number || 'N/A'
      },
      travel_tips: Array.isArray(data.travel_tips) ? data.travel_tips : []
    };

    return weatherData;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Re-throw with user-friendly message
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }
};