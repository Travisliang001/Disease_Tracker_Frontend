
import React from 'react';

function MapDisplay({ mapData }) {
    return (
        <div className="map-container">
            <h3>Display the case count in the map according to the zip code. (zip code of map with disease count)</h3>
            <div className="map-placeholder">
                {mapData ? (
                    <div className="map-content">
                        <p>Zip Code: {mapData.zipCode}</p>
                        <p>Disease: {mapData.disease}</p>
                        <p>Case Count: {mapData.caseCount}</p>
                        {/* In a real app, this would be replaced with an actual map component */}
                        <div style={{ fontStyle: 'italic', marginTop: '20px' }}>
                            Map visualization would be displayed here
                        </div>
                    </div>
                ) : (
                    <div className="no-data">Please select a zip code, disease, and time range and click Search</div>
                )}
            </div>
        </div>
    );
}

export default MapDisplay;