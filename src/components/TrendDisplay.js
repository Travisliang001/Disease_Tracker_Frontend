
import React from 'react';

function TrendDisplay({ trendData }) {
    return (
        <div className="trend-container">
            <h3>Trend by the time range selected by the user (shown in the graph)</h3>
            <div className="trend-placeholder">
                {trendData ? (
                    <div className="trend-content">
                        <p>Disease: {trendData.disease}</p>
                        <p>Time Range: {trendData.timeRange.from} to {trendData.timeRange.to}</p>
                        <div className="simulated-chart">
                            {/* In a real app, this would be replaced with an actual chart component */}
                            <div style={{ fontStyle: 'italic', marginTop: '20px' }}>
                                Trend chart would be displayed here
                            </div>
                            <ul>
                                {trendData.dataPoints.map((point, index) => (
                                    <li key={index}>{point.date}: {point.count} cases</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="no-data">Please select a zip code, disease, and time range and click Search</div>
                )}
            </div>
        </div>
    );
}

export default TrendDisplay;