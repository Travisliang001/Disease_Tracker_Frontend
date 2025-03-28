
// components/ZipCodeInput.js
import React from 'react';

function ZipCodeInput({ zipCode, setZipCode }) {
    return (
        <div className="input-group">
            <label>Zip Code:</label>
            <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="zip-input"
            />
            {/* <div className="current-location">
                Use Current Location
            </div> */}
        </div>
    );
}

export default ZipCodeInput;