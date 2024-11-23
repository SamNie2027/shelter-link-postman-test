import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DetailedShelterView } from '../components/DetailedShelterView';
import { shelters } from '../sheltersTest';

export const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <DetailedShelterView shelter={shelters[0]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
