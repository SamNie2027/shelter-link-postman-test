import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CompleteMap from '../components/CompleteMap';
import SignUpModal from '../components/SignUpModal';

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
});

export default App;
