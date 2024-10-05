import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shelter, shelters } from '../sheltersTest';

const Map: React.FC = ({
  onMarkerPress,
}: {
  onMarkerPress: (shelter: Shelter) => void;
}) => {
  return (
    <MapContainer
      center={[42.3601, -71.0589]}
      zoom={13}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 1,
        zIndex: -1000,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {shelters.map((shelter) => {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="font-size: 30px;">${shelter.emoji}</div>`,
        });

        return (
          <Marker
            key={shelter.id}
            position={[shelter.latitude, shelter.longitude]}
            icon={customIcon}
            onPress={() => onMarkerPress(shelter)}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
