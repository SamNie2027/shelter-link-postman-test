import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import FiltersDropdown from '../components/FiltersDropdown';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.searchBarContainer}>
            <SearchBar />
          </View>
          <View style={styles.headerContainer}>
            <Header />
          </View>
          <View style={styles.filtersDropdownContainer}>
            <FiltersDropdown />
          </View>
          <View style={styles.mapContainer}>
            <Map />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 18,
  },
  searchBarContainer: {
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingBottom: 22,
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  filtersDropdownContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 13,
    paddingBottom: 12,
  },
  mapContainer: {
  },
});

export default App;
