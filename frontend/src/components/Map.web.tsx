import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { shelters } from '../sheltersTest';

const Map: React.FC = () => {


  return (
    <div style={{ position: 'relative', display: 'flex', height: '100vh' }}>
      <MapContainer
        center={[42.3601, -71.0589]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shelters.map((shelter) => {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="font-size: 24px;">${shelter.emoji}</div>`,
          });

          return (
            <Marker
              key={shelter.id}
              position={[shelter.latitude, shelter.longitude]}
              icon={customIcon}

            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
