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
  const [selectedDisease, setSelectedDisease] = useState('');
  const [timeRange, setTimeRange] = useState({
    from: '',
    to: ''
  });
  const [displayData, setDisplayData] = useState({
    mapData: null,
    trendData: null
  });

  const handleSearch = () => {
    // In a real application, this would make an API call to fetch the data
    // For this example, we'll simulate loading data

    console.log("Searching with parameters:", { zipCode, selectedDisease, timeRange });

    // Simulate fetching map data
    const simulatedMapData = {
      zipCode,
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
        <MapDisplay mapData={displayData.mapData} />
        <TrendDisplay trendData={displayData.trendData} />
      </div>
    </div>
  );
}

export default App;