import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import FiltersDropdown from '../components/FiltersDropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import ShelterInfoPanel from '../components/ShelterInfoPanel';
import { Shelter, shelters } from '../sheltersTest';
import SignUpModal from '../components/SignUpModal';
import CompleteMap from '../components/CompleteMap';
import SignUpModal from '../components/SignUpModal';

export const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <CompleteMap />
      <View style={styles.centeredView}>
        <SignUpModal />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.centeredView}>
        <SignUpModal />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
