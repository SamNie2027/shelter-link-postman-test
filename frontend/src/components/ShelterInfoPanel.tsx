import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { bodyFont, darkMainColor } from '../../constants';
import { Shelter } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ShelterInfoPanelProps = {
  shelter: Shelter;
  style?: any;
};

type RootStackParamList = {
  'Map View': undefined;
  'Detailed Shelter View': {
    shelter: Shelter;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const outlineColor = 'red';

const ShelterInfoPanel = ({ shelter, style }: ShelterInfoPanelProps) => {
  const navigation = useNavigation<NavigationProp>();

  const formatAddress = (address: any) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  // for now, this redirects to google maps based on lat and long
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={[styles.panel, style]}
      onPress={() => navigation.navigate('Detailed Shelter View', { shelter })}
    >
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
          style={{ tintColor: darkMainColor }}
          source={require('../../assets/bookmark.png')}
        />
      </View>
      <Text style={styles.shelterName}>{shelter.name}</Text>
      <Text style={styles.shelterAddressDistance}>
        {formatAddress(shelter.address)}
      </Text>

      <Text
        style={{ ...styles.shelterRatingDescription, alignItems: 'center' }}
      >
        {shelter.rating}{' '}
        <Image
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            width: 10,
            height: 10,
            tintColor: darkMainColor,
          }}
          source={require('../../assets/teenyicons_star-solid.png')}
        ></Image>{' '}
        | {shelter.description}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={handleDirections}
        >
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() =>
            navigation.navigate('Detailed Shelter View', { shelter })
          }
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  panel: {
    width: 332,
    height: 214,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: darkMainColor,
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
    borderColor: darkMainColor,
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
    fontFamily: bodyFont,
    fontWeight: '400',
    lineHeight: 24.2,
    color: darkMainColor,
  },
  shelterAddressDistance: {
    paddingLeft: 15,
    fontSize: 15,
    fontFamily: bodyFont,
    fontWeight: '400',
    lineHeight: 18.15,
    color: darkMainColor,
  },
  shelterRatingDescription: {
    paddingLeft: 15,
    fontSize: 15,
    fontFamily: bodyFont,
    fontWeight: '400',
    lineHeight: 18.15,
    color: darkMainColor,
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
    borderColor: darkMainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnMoreButton: {
    width: 100,
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: darkMainColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: bodyFont,
    fontWeight: '400',
    lineHeight: 15.73,
    color: darkMainColor,
  },
});

export default ShelterInfoPanel;
