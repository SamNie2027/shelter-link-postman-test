import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CompleteMap } from '../components/CompleteMap';

export const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/*<View style={styles.logoContainer}>*/}
      {/*  <Logo />*/}
      {/*</View>*/}
      {/*<View style={styles.centeredView}>*/}
      {/*  <SignUpModal />*/}
      {/*</View>*/}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CompleteMap />
      </GestureHandlerRootView>

      {/*<DetailedShelterView shelter={shelters[0]} />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
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
  map: {
    width: '100%',
    height: '100%',
  },
  bottomSheet: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
