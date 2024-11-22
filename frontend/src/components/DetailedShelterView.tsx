import Logo from '../components/Logo';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

export const DetailedShelterView = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.text}>Non-Profit</Text>
      <View style={styles.quickInfoContainer}>
        <Text style={styles.quickInfoText}>4.8 stars rating | X min walk</Text>
        <Text style={styles.quickInfoText}>Address | Business Hours</Text>
        <Text style={styles.quickInfoText}>Short Description</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.websiteButton}>
          <Text style={styles.buttonText}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'flex-start',
    paddingLeft: 12,
    paddingTop: 11,
    paddingBottom: 18,
  },
  text: {
    marginLeft: 12,
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 38.73,
    color: '#000000',
  },
  quickInfoContainer: {
    width: 253,
    height: 75.14,
    marginTop: 12,
    marginLeft: 12,
  },
  quickInfoText: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 4,
  },
  buttonsContainer: {
    paddingTop: 10, // might need to change
    paddingLeft: 15,
    flexDirection: 'row',
  },
  directionsButton: {
    width: 106,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  websiteButton: {
    width: 115,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  contactButton: {
    width: 115,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 15.73,
    color: '#1E1E1E',
  },
});
