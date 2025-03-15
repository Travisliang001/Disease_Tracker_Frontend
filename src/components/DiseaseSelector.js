
import React from 'react';

function DiseaseSelector({ selectedDisease, setSelectedDisease }) {
    const diseases = [
        'COVID-19',
        'Influenza',
        'Measles',
        'Tuberculosis',
        'Malaria'
    ];

    return (
        <div className="input-group">
            <label>Disease Option:</label>
            <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="disease-dropdown"
            >
                <option value="">Select a disease</option>
                {diseases.map(disease => (
                    <option key={disease} value={disease}>{disease}</option>
                ))}
            </select>
        </div>
    );
}

export default DiseaseSelector;