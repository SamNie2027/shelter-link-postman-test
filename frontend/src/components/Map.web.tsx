import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ShelterInfoPanel from './ShelterInfoPanel';

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
];

const Map: React.FC = () => {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  const handleMarkerClick = (shelter: Shelter) => {
    setSelectedShelter(shelter);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Map Section */}
      <MapContainer
        center={[42.3601, -71.0589]}
        zoom={13}
        style={{ height: '562px', width: '60%' }}
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
              eventHandlers={{
                click: () => handleMarkerClick(shelter),
              }}
            />
          );
        })}
      </MapContainer>

      {/* Shelter Info Panel Section */}
      <div style={{ width: '40%', padding: '10px' }}>
        {selectedShelter ? (
          <ShelterInfoPanel
            title={selectedShelter.title}
            description={selectedShelter.description}
          />
        ) : (
          <div>Select a shelter to view details</div>
        )}
      </div>
    </div>
  );
};

export default Map;
