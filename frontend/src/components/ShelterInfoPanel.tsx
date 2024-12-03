import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Shelter } from '../sheltersTest';

type ShelterInfoPanelProps = {
  shelter: Shelter;
  style?: any;
};

const ShelterInfoPanel = ({ shelter, style }: ShelterInfoPanelProps) => {
  const formatAddress = (address: any) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  return (
    <View style={[styles.panel, style]}>
      <View style={styles.topRowItems}>
        <View style={styles.images}>
          {shelter.picture.slice(0, 3).map((url, index) => (
            <Image
              key={index}
              source={{ uri: url }}
              style={styles.shelterImage}
            />
          ))}
        </View>
      </View>
      <View style={styles.bookmarkContainer}>
        <Image
          source={require('frontend/assets/bookmark.png')}
        />
      </View>
      <Text style={styles.shelterName}>{shelter.name}</Text>
      <Text style={styles.shelterAddressDistance}>
        {formatAddress(shelter.address)} | Distance
      </Text>
      <Text style={styles.shelterRatingDescription}>
        {shelter.overall_rating} | {shelter.description}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.directionsButton}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: 332,
    height: 214,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'white',
  },
  topRowItems: {
    flexDirection: 'row',
  },
  images: {
    paddingTop: 8,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  shelterImage: {
    width: 84,
    height: 84,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 9,
    borderColor: '#000000',
    backgroundColor: '#D9D9D9',
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 11,
  },
  shelterName: {
    paddingLeft: 15,
    paddingTop: 4,
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 24.2,
  },
  shelterAddressDistance: {
    paddingLeft: 15,
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18.15,
    color: '#1E1E1E',
  },
  shelterRatingDescription: {
    paddingLeft: 15,
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18.15,
    color: '#1E1E1E',
  },
  buttonsContainer: {
    paddingTop: 10, // might need to change
    paddingLeft: 15,
    flexDirection: 'row',
  },
  directionsButton: {
    width: 93,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreButton: {
    width: 100,
    height: 28,
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

export default ShelterInfoPanel;
