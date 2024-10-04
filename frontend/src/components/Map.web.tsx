import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Shelter = {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  emoji: string;
};

const shelters: Shelter[] = [
  {
    id: 1,
    title: 'Shelter One',
    description: 'Sample description of Shelter One',
    latitude: 42.3611,
    longitude: -71.0579,
    emoji: '🏳️‍🌈',
  },
  {
    id: 2,
    title: 'Shelter Two',
    description: 'Sample description of Shelter Two',
    latitude: 42.3584,
    longitude: -71.065,
    emoji: '🏳️‍⚧️',
  },
  {
    id: 3,
    title: 'Shelter Three',
    description: 'Sample description of Shelter Three',
    latitude: 42.2995,
    longitude: -71.0649,
    emoji: '🔅',
  },
  {
    id: 4,
    title: 'Shelter Four',
    description: 'Sample description of Shelter Four',
    latitude: 42.3657,
    longitude: -71.0824,
    emoji: '🩵',
  },
];

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
              // eventHandlers={{
              //   click: () => handleMarkerClick(shelter),
              // }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
