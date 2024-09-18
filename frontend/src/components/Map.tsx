import React from 'react';
import { StyleSheet, View } from 'react-native';

const Map = () => {
  return (
      <View style={styles.mapRectangle} />
  );
};

const styles = StyleSheet.create({
  mapRectangle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 562,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
});

export default Map;
