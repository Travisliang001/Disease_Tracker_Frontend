import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

function HeatmapLayer({ points, radius = 25, blur = 15, maxZoom = 10 }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !points.length) return;

        // Convert points to the format expected by Leaflet.heat
        const heatPoints = points.map(p => [p.lat, p.lng, p.value]);

        // Create heat layer
        const heat = L.heatLayer(heatPoints, {
            radius,
            blur,
            maxZoom,
            gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
        }).addTo(map);

        // Clean up on unmount
        return () => {
            map.removeLayer(heat);
        };
    }, [map, points, radius, blur, maxZoom]);

    return null; // This component doesn't render anything
}

export default HeatmapLayer;