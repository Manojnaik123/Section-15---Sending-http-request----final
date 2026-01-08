# Starting Project

### Start the backend and react project attached to the project after installing the npm modules.

# 233 Preparing the app for Data fetching. 
### Every data related to this project is in the backend. We have to connect these 2 things together to get evrything runnung. 

# 234 How not to send HTTP requests 

```jsx
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces]= useState([]);

  fetch('http://localhost:3000/places')
  .then((response)=>{
    return response.json();
  })
  .then((resData)=>{
    setAvailablePlaces(resData.places);
  });

  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

```

### Here fetch() is an builtin browser funtion used to request apis. 
### if we write code like above the component will be stuck in infinite loop so do not do this way. 

# 235 Sending HTTP Requests 

### we will fetch the places data in the AvailablePlaces.jxs file 

##### AvailablePlaces Before 
```jsx 
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

```

##### Available places after change 
```jsx
import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/places')
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []) // now here is an empty array this mens the there are no dependencies inside the array and they wont change. 
         // In this case this component function will only run once after this component function excuted. 
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

# 236 Using async/await

### This is how we can simplfy above code using async and await. 
```jsx
import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    fetchPlaces();

  }, []) // now here is an empty array this mens the there are no dependencies inside the array and they wont change. 
  // In this case this component function will only run once after this component function excuted. 
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

```
# Handling loading states

## When we go to the developer tool's network and change it to 3g we will see a bad user exprience. 

#### we will see this 
![alt text](image.png)

#### Then we will see this 
![alt text](image-1.png)

## To resolve this we need some to add loadingText and isLoading flag to the places component.

##### places.jsx
```jsx
export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>} {/* new line  */}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>} {/* added isloading flag  */}
      {!isLoading && places.length > 0 && (   
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}   {/* added isloading flag  */}
    </section>
  );
}

```

#### AvailablePlaces.jsx

```jsx
import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

    async function fetchPlaces() {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsLoading(false);
    }

    fetchPlaces();

  }, []) // now here is an empty array this mens the there are no dependencies inside the array and they wont change. 
  // In this case this component function will only run once after this component function excuted. 
  return (
    <Places
      loadingText="Fetching place data" // new
      isLoading={isLoading}              // new
      title="Available Places"  
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />  
  );
}
```
# Handling HTTP Errors 
### Here will import errorpage and write code to display the error page in acse of an error. 

```jsx
import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(); // changes 

  useEffect(() => {

    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/placess'); // willingly changes the places to placess to get error
        const resData = await response.json();

        if (!response.ok) {  // changes 
          throw new Error('Failed to fetch places');
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error); // changes 
      }
      setIsLoading(false);
    }

    fetchPlaces();

  }, []) // now here is an empty array this mens the there are no dependencies inside the array and they wont change. 
  // In this case this component function will only run once after this component function excuted. 
 
  if(error){  // changes 
    return <ErrorPage title='An error occured!' message={error.message}/>
  }
 
 
  return (
    <Places
      loadingText="Fetching place data" // new
      isLoading={isLoading}              // new
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

```
# 240 Transforming fetched data

```jsx
import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(); 

  useEffect(() => {

    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/places'); 
        const resData = await response.json();

       if (!response.ok) {  
          throw new Error('Failed to fetch places');
        }

        navigator.geolocation.getCurrentPosition((pos)=>{ // changes
          const places = sortPlacesByDistance(
            resData.places, 
            pos.coords.latitude, 
            pos.coords.longitude
          );
          setAvailablePlaces(places);
          setIsLoading(false); // changes
        })

        
      } catch (error) {
        setError(error); 
        setIsLoading(false);// changes
      }
      // setIsLoading(false)
    }

    fetchPlaces();

  }, []) // now here is an empty array this mens the there are no dependencies inside the array and they wont change. 
  // In this case this component function will only run once after this component function excuted. 
 
  if(error){  // changes 
    return <ErrorPage title='An error occured!' message={error.message}/>
  }
 
 
  return (
    <Places
      loadingText="Fetching place data" // new
      isLoading={isLoading}              // new
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

```

# 241 Extracting code and improving code structure 

##### http.js
```js
export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return resData.places;
}
```

##### Availableplaces.jsx
```jsx
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

```
# Sending Data with POST request 

### These are the changes made 

##### http.js
```jsx
export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if(!response.ok){
        throw new Error('failed to update user data');
    }

    return resData.message;
}
```

##### App.jsx

```jsx
import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';
import ErrorPage from '../src/components/Error.jsx'

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces])
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({ message: error.message || 'Failed to update places' });
    }

  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  function handleError(){
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && <ErrorPage
          title='An error occured'
          message={errorUpdatingPlaces.message}
          onConfirm={handleError}
        />}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}
export default App;

```
# 244 Deleting data 
### Changes only in this file
```jsx
import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';
import ErrorPage from '../src/components/Error.jsx'

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces])
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({ message: error.message || 'Failed to update places' });
    }

  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() { // changes in this function 
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to remoce place'})
    }
    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && <ErrorPage
          title='An error occured'
          message={errorUpdatingPlaces.message}
          onConfirm={handleError}
        />}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

```



