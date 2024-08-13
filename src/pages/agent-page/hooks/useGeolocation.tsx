// useGeolocation.tsx
import { useCallback } from 'react';

interface GeolocationError {
  code: number;
  message: string;
}

export const useGeolocation = (setGeolocation: (lat: number, lon: number) => void, setGeoError: (error: string | null) => void) => {
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by this browser.');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation(position.coords.latitude, position.coords.longitude);
        },
        (error: GeolocationError) => {
          setGeoError('Error fetching geolocation.');
        }
      );
    }
  }, [setGeolocation, setGeoError]);

  return { getCurrentLocation };
};
