import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ShelterInfoPanel from './ShelterInfoPanel';
import { Shelter, shelters } from '../sheltersTest';

const Map = () => {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  const handleMarkerPress = (shelter: Shelter) => {
    setSelectedShelter(shelter);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3601,
          longitude: -71.0589,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {shelters.map((shelter) => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude,
            }}
            onPress={() => handleMarkerPress(shelter)}
          >
            <Text style={styles.customMarker}>{shelter.emoji}</Text>
          </Marker>
        ))}
      </MapView>

      {selectedShelter && (
        <ShelterInfoPanel
          title={selectedShelter.title}
          description={selectedShelter.description}
          // to do: add other fields
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    borderRadius: 10,
    width: '100%',
    height: 562,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    fontSize: 30,
  },
});

export default Map;
