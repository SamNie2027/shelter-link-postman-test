import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import FiltersDropdown from '../components/FiltersDropdown';
import SignUpModal from '../components/SignUpModal';
import CompleteMap from '../components/CompleteMap';

export const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CompleteMap />
      <View style={styles.centeredView}>
        <SignUpModal />
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
  logoContainer: {
    marginBottom: 20,
  },
  searchBarContainer: {
    marginVertical: 10,
  },
  headerContainer: {
    marginTop: 20,
  },
  filtersDropdownContainer: {
    marginVertical: 10,
  },
});

export default App;
