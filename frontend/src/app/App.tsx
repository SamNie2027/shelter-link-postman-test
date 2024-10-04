import React, { useCallback, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Map from '../components/Map';
import FiltersDropdown from '../components/FiltersDropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

export const App = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
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
              data={Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`)}
              keyExtractor={(i) => i}
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
  contentContainer: {
    backgroundColor: 'white',
  },
  bottomSheetContainer: {
    flex: 1,
    paddingTop: 200,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
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
