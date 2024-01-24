// LeafletMapComponent.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';

const LeafletMapComponent = ({ center, usStatesCoords,populations }) => {
  const geoJsonFeatures = Object.keys(usStatesCoords).map((state) => {
    return {
      type: 'Feature',
      properties: { name: state },
      geometry: {
        type: 'Polygon',
        coordinates: [usStatesCoords[state].map(coord => [coord.lng, coord.lat])],
      },
    };
  });

  const geoJsonData = {
    type: 'FeatureCollection',
    features: geoJsonFeatures,
  };
  const onEachState = (feature, layer) => {
    const stateName = feature.properties.name;
    const popupContent = (
      <div>
        <h2 className='text-[#be3207]'>{stateName}</h2>
        <p className='!m-0'>Populations:<b className='scale-120'>{populations[stateName]}</b></p>
      </div>
    );
    const popupContentString = renderToString(popupContent);
    layer.bindPopup(popupContentString);
  };

  return (
    <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render GeoJSON data for US states */}
      <GeoJSON data={geoJsonData}
      onEachFeature={onEachState}
      style={{ fillColor: '#8f362884', fillOpacity: 0.5, color: 'black' }} />

    </MapContainer>
  );
};

export default LeafletMapComponent;
