// src/utils/geolocation.js
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }),
      (error) => reject(new Error(error?.message || 'Geolocation permission denied')),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
};
