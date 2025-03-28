import React, { useState } from 'react';
import './App.css';
import ZipCodeInput from './components/ZipCodeInput';
import TimeRangeSelector from './components/TimeRangeSelector';
import DiseaseSelector from './components/DiseaseSelector';
import MapDisplay from './components/MapDisplay';
import TrendDisplay from './components/TrendDisplay';
import Header from './components/Header';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [selectedDisease, setSelectedDisease] = useState('');
  const [timeRange, setTimeRange] = useState({
    from: '',
    to: ''
  });
  const [displayData, setDisplayData] = useState({
    mapData: {
      zipCode: '',
      coordinates: { latitude: null, longitude: null },
      disease: '',
      caseCount: 0
    },
    trendData: null
  });
  const [loading, setLoading] = useState(false); // New loading state

  const handleSearch = async () => {
    // console.log("Searching with parameters:", { zipCode, selectedDisease, timeRange });

    // Validate zip code
    if (!/^\d{5}$/.test(zipCode)) {
      alert('Please enter a valid 5-digit ZIP code');
      return;
    }

    // Validate selected disease
    if (!selectedDisease) {
      alert('Please select a disease');
      return;
    }

    // Validate time range
    if (!timeRange.from || !timeRange.to) {
      alert('Please select a valid time range');
      return;
    }

    if (new Date(timeRange.from) > new Date(timeRange.to)) {
      alert('The "from" date cannot be later than the "to" date');
      return;
    }
    // sleep for 2 seconds to simulate loading synchronous behavior

    setLoading(true); // Set loading to true before starting the search

    try {
      // First, get the latitude and longitude for the ZIP code
      const OPENWEATHER_API_KEY = '6e92a8936f479362a90f3ace6259c491';
      const zipCodeResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},us&appid=${OPENWEATHER_API_KEY}`
      );
      if (!zipCodeResponse.ok) {
        throw new Error('Failed to fetch location data');
      }

      const res = await zipCodeResponse.json();

      // Extract coordinates from the weather data
      const latitude = res.lat;
      const longitude = res.lon;

      // console.log(`Coordinates for ${zipCode}: Lat ${latitude}, Long ${longitude}`);

      // Now proceed with the rest of your search using these coordinates
      setCoordinates({ latitude, longitude });
      // Simulate fetching map data
      const simulatedMapData = {
        zipCode,
        coordinates: { latitude, longitude },
        disease: selectedDisease,
        caseCount: Math.floor(Math.random() * 100)
      };
      console.log('Simulated map data:', simulatedMapData);

      // Simulate fetching trend data
      const simulatedTrendData = {
        disease: selectedDisease,
        timeRange,
        dataPoints: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, (_, index) => {
          const startDate = new Date(timeRange.from);
          const endDate = new Date(timeRange.to);
          const timeDiff = endDate - startDate;
          const randomDate = new Date(startDate.getTime() + Math.random() * timeDiff);
          return {
            date: randomDate.toISOString().split('T')[0],
            count: Math.floor(Math.random() * 50)
          };
        }).sort((a, b) => new Date(a.date) - new Date(b.date))
      };

      setDisplayData({
        mapData: simulatedMapData,
        trendData: simulatedTrendData
      });
      // Simulate a delay to mimic network request
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Error in search:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="search-controls">
        <div className="zip-section">
          <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} />
        </div>

        <div className="disease-section">
          <DiseaseSelector
            selectedDisease={selectedDisease}
            setSelectedDisease={setSelectedDisease}
          />
        </div>

        <div className="time-range-section">
          <TimeRangeSelector
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleSearch={handleSearch}
          />
        </div>
      </div>
      {loading && (
        <div className="loading-logo">
          <img src="/loading.gif" alt="Loading..." />
        </div>
      )}
      <div className="data-display">
        <MapDisplay mapData={displayData.mapData} coordinates={coordinates} />
        <TrendDisplay trendData={displayData.trendData} />
      </div>
    </div>
  );
}

export default App;