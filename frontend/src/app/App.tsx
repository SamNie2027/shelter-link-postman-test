import React, { useCallback, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import FiltersDropdown from '../components/FiltersDropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import ShelterInfoPanel from '../components/ShelterInfoPanel';
import { Shelter, shelters } from '../sheltersTest';

export const App = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const renderItem = useCallback(
    ({ item }: { item: Shelter }) => (
      <ShelterInfoPanel
        title={item.title}
        description={item.description}
        style={styles.itemContainer}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <GestureHandlerRootView>
        <Map />
        <View style={styles.bottomSheetContainer}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <BottomSheetFlatList
              data={shelters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 29,
    marginTop: 29,
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
  bottomSheetContainer: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    // paddingHorizontal: 29,
    // paddingBottom: 29,
    // alignItems: 'center',
  },
});

export default App;
