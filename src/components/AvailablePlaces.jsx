import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js'; //changes

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const places = await fetchAvailablePlaces(); // changes 

        navigator.geolocation.getCurrentPosition((pos) => {
          const sortedPlaces = sortPlacesByDistance(
            places,  // changes 
            pos.coords.latitude,
            pos.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        })
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchPlaces();
  }, [])

  if (error) {
    return <ErrorPage title='An error occured!' message={error.message} />
  }


  return (
    <Places
      loadingText="Fetching place data"
      isLoading={isLoading}
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
