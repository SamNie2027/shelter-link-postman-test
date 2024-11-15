import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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

const Map = () => {
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
            title={shelter.title}
            description={shelter.description}
          >
            <Text style={styles.customMarker}>{shelter.emoji}</Text>
          </Marker>
        ))}
      </MapView>
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
