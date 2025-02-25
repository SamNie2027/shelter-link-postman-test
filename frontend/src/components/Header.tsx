import { bodyFont, darkMainColor, headerFont } from 'frontend/constants';
import React from 'react';
<<<<<<< Updated upstream
import { Text, StyleSheet, View } from 'react-native';
=======
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import "leaflet/dist/leaflet.css";

>>>>>>> Stashed changes

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Map</Text>
      <Text style={styles.headerDescription}>Brief description of map features</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontFamily: headerFont,
    fontSize: 84,
    fontWeight: '400',
    lineHeight: 43.57,
    textAlign: 'center',
    color: darkMainColor,
    marginBottom: 9,
  },
  headerDescription: {
    fontFamily: bodyFont,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 18.15,
    textAlign: 'center',
    color: '#1E1E1E',
  },
});

export default Header;
