import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import FiltersDropdown from '../components/FiltersDropdown';
import ShelterInfoPanel from '../components/ShelterInfoPanel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../components/BottomSheet';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar />
            <BottomSheet />
          </View>
        </GestureHandlerRootView>
        {/*<ScrollView contentInsetAdjustmentBehavior="automatic">*/}
        {/*  <View style={styles.logoContainer}>*/}
        {/*    <Logo />*/}
        {/*  </View>*/}
        {/*  <View style={styles.searchBarContainer}>*/}
        {/*    <SearchBar />*/}
        {/*  </View>*/}
        {/*  <View style={styles.headerContainer}>*/}
        {/*    <Header />*/}
        {/*  </View>*/}
        {/*  <View style={styles.filtersDropdownContainer}>*/}
        {/*    <FiltersDropdown />*/}
        {/*  </View>*/}
        {/*  <View>*/}
        {/*    <Map />*/}
        {/*  </View>*/}
        {/*  <View>*/}
        {/*    /!*temp call for testing*!/*/}
        {/*    /!*<ShelterInfoPanel />*!/*/}
        {/*  </View>*/}
        {/*</ScrollView>*/}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
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
});
export default App;
