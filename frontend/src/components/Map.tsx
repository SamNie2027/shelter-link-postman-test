import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const shelters = [
  {
    //test shelter data for markers
    id: 1,
    title: 'Shelter One',
    description: 'random description 1',
    latitude: 42.3611,
    longitude: -71.0579,
  },
  {
    id: 2,
    title: 'Shelter Two',
    description: 'random description 2',
    latitude: 42.3584,
    longitude: -71.0590,
  },
];

const Map = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3601,
          longitude: -71.0589,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {shelters.map(shelter => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude,
            }}
            title={shelter.title}
            description={shelter.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    borderRadius: 10,
    width: 395,
    height: 562,
  },
});

export default Map;
