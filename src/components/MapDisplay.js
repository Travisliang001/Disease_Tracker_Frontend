import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapLayer from './HeatmapLayer';

// Make Leaflet work properly in React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapDisplay({ mapData, coordinates }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const heatLayerRef = useRef(null);

    // console.log("MapDisplay component rendered with mapData:", mapData);

    // Default center of US
    const defaultCenter = coordinates.latitude && coordinates.longitude ? [coordinates.latitude, coordinates.longitude] : [37.8, -96.9];
    const defaultZoom = 4;

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            // Create map instance
            mapInstanceRef.current = L.map(mapRef.current, {
                center: defaultCenter,
                zoom: defaultZoom,
                zoomControl: false
            });

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstanceRef.current);

            // Add zoom control
            L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);
        }

        // Cleanup function to run when component unmounts
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Recenter map when coordinates change
    useEffect(() => {
        if (mapInstanceRef.current && coordinates.latitude && coordinates.longitude) {
            console.log("Updating map center to coordinates:", coordinates);
            const newCenter = [coordinates.latitude, coordinates.longitude];
            mapInstanceRef.current.setView(newCenter, mapInstanceRef.current.getZoom());
        }
    }, [coordinates]);

    // Generate sample heatmap data and update when mapData changes
    useEffect(() => {
        console.log("changes", mapData);
        if (!mapInstanceRef.current || !mapData) return;

        // Remove previous heat layer if it exists
        if (heatLayerRef.current) {
            mapInstanceRef.current.removeLayer(heatLayerRef.current);
            heatLayerRef.current = null;
        }

        // For this example, we'll create some random points around the center
        console.log("Generating heatmap data for mapData:", mapData);
        const zipCodes = [
            { zip: mapData.zipCode, lat: 39.8283, lng: -98.5795, count: mapData.caseCount },
            { zip: '10001', lat: 40.7501, lng: -73.9964, count: Math.floor(Math.random() * 50) },
            { zip: '90001', lat: 33.9731, lng: -118.2479, count: Math.floor(Math.random() * 50) },
            { zip: '60601', lat: 41.8834, lng: -87.6212, count: Math.floor(Math.random() * 50) },
            { zip: '75001', lat: 32.9546, lng: -96.8350, count: Math.floor(Math.random() * 50) },
            { zip: '20001', lat: 38.9117, lng: -77.0202, count: Math.floor(Math.random() * 50) },
        ];

        // Find the selected zip code data
        const selectedZip = zipCodes.find(z => z.zip === mapData.zipCode);
        console.log("Selected zip code:", selectedZip);
        // If we found the zip code, center map on it
        if (selectedZip) {
            console.log("Centering map on selected zip code:", selectedZip);
            mapInstanceRef.current.setView([selectedZip.lat, selectedZip.lng], 8);
        }

        if (coordinates.latitude && coordinates.longitude) {
            mapInstanceRef.current.setView([coordinates.latitude, coordinates.longitude], 8);
        }

        // Convert to heatmap points format
        const heatPoints = zipCodes.map(zip => [zip.lat, zip.lng, zip.count]);

        // Create new heat layer
        heatLayerRef.current = L.heatLayer(heatPoints, {
            radius: 20,
            blur: 15,
            maxZoom: 10,
            gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
        }).addTo(mapInstanceRef.current);

    }, [mapData, coordinates]);

    return (
        <div className="map-container">
            <h3>Display the case count in the map according to the zip code. (zip code of map with disease count)</h3>
            <div className="map-visualization">
                {mapData ? (
                    <>
                        <div className="map-info">
                        </div>
                        <div className="leaflet-container" ref={mapRef}></div>
                    </>
                ) : (
                    <div className="no-data">Please select a zip code, disease, and time range and click Search</div>
                )}
            </div>
        </div>
    );
}

export default MapDisplay;

// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix Leaflet icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// function MapDisplay({ mapData, coordinates }) {
//     const mapRef = useRef(null);
//     const mapInstanceRef = useRef(null);
//     const heatLayerRef = useRef(null);

//     console.log("MapDisplay component rendered with mapData:", mapData);
//     console.log("Coordinates for map center:", coordinates);

//     // Default to US center if no coordinates are provided
//     const defaultCenter = [37.8, -96.9];
//     const defaultZoom = 4;

//     // Initialize map only once
//     useEffect(() => {
//         if (mapRef.current && !mapInstanceRef.current) {
//             // Initial center - use coordinates if available, otherwise use default
//             const initialCenter = coordinates && coordinates.latitude && coordinates.longitude
//                 ? [coordinates.latitude, coordinates.longitude]
//                 : defaultCenter;

//             console.log("Initializing map with center:", initialCenter);

//             // Create map instance
//             mapInstanceRef.current = L.map(mapRef.current, {
//                 center: initialCenter,
//                 zoom: coordinates && coordinates.latitude ? 10 : defaultZoom, // Zoom in more if we have specific coordinates
//                 zoomControl: false
//             });

//             // Add tile layer
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(mapInstanceRef.current);

//             // Add zoom control
//             L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);
//         }

//         // Cleanup function to run when component unmounts
//         return () => {
//             if (mapInstanceRef.current) {
//                 mapInstanceRef.current.remove();
//                 mapInstanceRef.current = null;
//             }
//         };
//     }, []); // Empty dependency array means this runs once on mount

//     // Handle coordinate changes - this effect must be separate from the initialization
//     useEffect(() => {
//         if (mapInstanceRef.current && coordinates && coordinates.latitude && coordinates.longitude) {
//             console.log("Updating map center to coordinates:", coordinates);
//             const newCenter = [coordinates.latitude, coordinates.longitude];

//             // Set view with animation and slightly closer zoom level
//             mapInstanceRef.current.setView(newCenter, 10, {
//                 animate: true,
//                 duration: 1
//             });
//         }
//     }, [coordinates]); // Only re-run when coordinates change

//     //     // Recenter map when coordinates change
//     useEffect(() => {
//         if (mapInstanceRef.current && coordinates.latitude && coordinates.longitude) {
//             console.log("Updating map center to coordinates:", coordinates);
//             const newCenter = [coordinates.latitude, coordinates.longitude];
//             mapInstanceRef.current.setView(newCenter, mapInstanceRef.current.getZoom());
//         }
//     }, [coordinates]);

//     // Generate sample heatmap data and update when mapData changes
//     useEffect(() => {
//         if (!mapInstanceRef.current || !mapData) return;

//         // Remove previous heat layer if it exists
//         if (heatLayerRef.current) {
//             mapInstanceRef.current.removeLayer(heatLayerRef.current);
//             heatLayerRef.current = null;
//         }

//         // For this example, we'll create some random points around the center
//         const zipCodes = [
//             { zip: mapData.zipCode, lat: 39.8283, lng: -98.5795, count: mapData.caseCount },
//             { zip: '10001', lat: 40.7501, lng: -73.9964, count: Math.floor(Math.random() * 50) },
//             { zip: '90001', lat: 33.9731, lng: -118.2479, count: Math.floor(Math.random() * 50) },
//             { zip: '60601', lat: 41.8834, lng: -87.6212, count: Math.floor(Math.random() * 50) },
//             { zip: '75001', lat: 32.9546, lng: -96.8350, count: Math.floor(Math.random() * 50) },
//             { zip: '20001', lat: 38.9117, lng: -77.0202, count: Math.floor(Math.random() * 50) },
//         ];

//         // Find the selected zip code data
//         const selectedZip = zipCodes.find(z => z.zip === mapData.zipCode);

//         // If we found the zip code, center map on it
//         if (selectedZip) {
//             mapInstanceRef.current.setView([selectedZip.lat, selectedZip.lng], 8);
//         }

//         // Convert to heatmap points format
//         const heatPoints = zipCodes.map(zip => [zip.lat, zip.lng, zip.count]);

//         // Create new heat layer
//         heatLayerRef.current = L.heatLayer(heatPoints, {
//             radius: 20,
//             blur: 15,
//             maxZoom: 10,
//             gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
//         }).addTo(mapInstanceRef.current);

//     }, [mapData]);

//     return (
//         <div className="map-container">
//             <h3>Display the case count in the map according to the zip code. (zip code of map with disease count)</h3>
//             <div className="map-visualization">
//                 {mapData ? (
//                     <>
//                         <div className="map-info">
//                         </div>
//                         <div className="leaflet-container" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
//                     </>
//                 ) : (
//                     <div className="no-data">Please select a zip code, disease, and time range and click Search</div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default MapDisplay;