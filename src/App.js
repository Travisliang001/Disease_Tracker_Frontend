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
      zipCode: '10001',
      disease: 'COVID-19',
      caseCount: 47
    },
    trendData: {
      disease: 'COVID-19',
      timeRange: {
        from: '2023-01-01',
        to: '2023-04-01'
      },
      dataPoints: [
        { date: '2023-01-01', count: 32 },
        { date: '2023-02-01', count: 28 },
        { date: '2023-03-01', count: 41 },
        { date: '2023-04-01', count: 37 }
      ]
    }
  });

  const handleSearch = async () => {
    console.log("Searching with parameters:", { zipCode, selectedDisease, timeRange });

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

      console.log(`Coordinates for ${zipCode}: Lat ${latitude}, Long ${longitude}`);

      // Now proceed with the rest of your search using these coordinates
      setCoordinates({ latitude, longitude });
      // Simulate fetching map data
      const simulatedMapData = {
        zipCode,
        coordinates: { latitude, longitude },
        disease: selectedDisease,
        caseCount: Math.floor(Math.random() * 100)
      };

      // Simulate fetching trend data
      const simulatedTrendData = {
        disease: selectedDisease,
        timeRange,
        dataPoints: [
          { date: '2023-01-01', count: Math.floor(Math.random() * 50) },
          { date: '2023-02-01', count: Math.floor(Math.random() * 50) },
          { date: '2023-03-01', count: Math.floor(Math.random() * 50) },
          { date: '2023-04-01', count: Math.floor(Math.random() * 50) }
        ]
      };

      setDisplayData({
        mapData: simulatedMapData,
        trendData: simulatedTrendData
      });
    } catch (error) {
      console.error('Error in search:', error);
      alert(`Error: ${error.message}`);
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

      <div className="data-display">
        <MapDisplay mapData={displayData.mapData} coordinates={coordinates} />
        <TrendDisplay trendData={displayData.trendData} />
      </div>
    </div>
  );
}

export default App;