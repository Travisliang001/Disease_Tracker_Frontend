
import React from 'react';

function TimeRangeSelector({ timeRange, setTimeRange, handleSearch }) {
    const handleFromChange = (e) => {
        setTimeRange({ ...timeRange, from: e.target.value });
    };

    const handleToChange = (e) => {
        setTimeRange({ ...timeRange, to: e.target.value });
    };

    return (
        <div className="time-range-container">
            <label>Time Range:</label>

            <div className="range-inputs">
                <div className="date-input">
                    <span>From:</span>
                    <input
                        type="date"
                        value={timeRange.from}
                        onChange={handleFromChange}
                    />
                </div>

                <div className="date-input">
                    <span>To:</span>
                    <input
                        type="date"
                        value={timeRange.to}
                        onChange={handleToChange}
                    />
                </div>

                <button
                    className="search-btn"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default TimeRangeSelector;
