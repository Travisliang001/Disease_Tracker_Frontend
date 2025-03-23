import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TrendDisplay({ trendData }) {
    // Format dates for better display
    const formattedData = trendData?.dataPoints?.map(point => ({
        ...point,
        // Format date for display (e.g., "Jan 2023" instead of "2023-01-01")
        formattedDate: new Date(point.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }));

    return (
        <div className="trend-container">
            <h3>Trend by the time range selected by the user</h3>
            <br />
            <div className="trend-placeholder">
                {trendData ? (
                    <div className="trend-content">
                        <div className="trend-header">

                        </div>

                        {/* Chart container with fixed height */}
                        <div className="chart-container" style={{ width: '100%', height: '300px', marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={formattedData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="formattedDate" />
                                    <YAxis label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value) => [`${value} cases`, 'Count']} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        name="Case Count"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Data points table */}
                        <div className="data-points-table" style={{ marginTop: '20px' }}>

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