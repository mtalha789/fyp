import React, { useState } from 'react';
import axios from 'axios';

const GeoAddressSearch = () => {
  const [inputValue, setInputValue] = useState(''); // Input for zip code, street, etc.
  const [locationData, setLocationData] = useState(null); // Store the address
  const [errorMessage, setErrorMessage] = useState(null); // Store error messages

  // Function to get user's current location using navigator
  const getUserLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          callback({ latitude, longitude });
        },
        (error) => {
          setErrorMessage('Unable to retrieve your location');
          callback(null);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
      callback(null);
    }
  };

  // Function to handle button click and fetch location data from OpenCage
  const handleGetAddress = async () => {
    // First get user's current location
    getUserLocation(async (location) => {
      if (location) {
        const { latitude, longitude } = location;

        try {
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5e6caa49c7ae44feb25c181c5ad52b0e`;
          const response = await (await fetch(url)).json();

          if (response.data.results.length > 0) {
            const result = response.data.results[0];
            setLocationData({
              formatted_address: result.formatted,
              latitude: result.geometry.lat,
              longitude: result.geometry.lng,
            });
          } else {
            setErrorMessage('No results found.');
            setLocationData(null);
          }
        } catch (error) {
          console.error('Error fetching location data', error);
          setErrorMessage('Error fetching location data.');
          setLocationData(null);
        }
      }
    });
  };

  async function getZipCode(lat, lon) {
    const apiKey = '5e6caa49c7ae44feb25c181c5ad52b0e';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const postalCode = data.results[0].components.postcode;
  
      console.log('Zip Code:', postalCode);
    } catch (error) {
      console.error('Error fetching zip code:', error);
    }
  }
  

  return (
    <div>
      <h1>Get Address Using Zip Code, Street, and Geolocation</h1>

      {/* Input for manual zip code or street reference */}
      <input
        type="text"
        placeholder="Enter zip code, street, or area"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Button to trigger geolocation and get address */}
      <button onClick={handleGetAddress}>Get My Address</button>

      {/* Display location data */}
      {locationData && (
        <div>
          <h3>Location Details</h3>
          <p><strong>Formatted Address:</strong> {locationData.formatted_address}</p>
          <p><strong>Latitude:</strong> {locationData.latitude}</p>
          <p><strong>Longitude:</strong> {locationData.longitude}</p>
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div style={{ color: 'red' }}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default GeoAddressSearch;
