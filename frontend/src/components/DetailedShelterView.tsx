import Logo from '../components/Logo';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface Shelter {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  latitude: number;
  longitude: number;
  description: string;
  overall_rating: number;
  inclusivity_rating: number;
  safety_rating: number;
  availability: string;
  phone_number: string;
  email_address: string;
  opening_time: string;
  closing_time: string;
  picture: string[];
}

interface Props {
  shelter: Shelter;
}

export const DetailedShelterView: React.FC<Props> = ({ shelter }) => {
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;
    Linking.openURL(url);
  };

  const handleContact = () => {
    Linking.openURL(`tel:${shelter.phone_number}`);
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.text}>{shelter.name}</Text>
      <View style={styles.quickInfoContainer}>
        <Text style={styles.quickInfoText}>
          {shelter.overall_rating.toFixed(1)} stars rating | {shelter.availability}
        </Text>
        <Text style={styles.quickInfoText}>
          {shelter.address.street}, {shelter.address.city} |
          {formatTime(shelter.opening_time)} - {formatTime(shelter.closing_time)}
        </Text>
        <Text style={styles.quickInfoText}>{shelter.availability}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.directionsButton} onPress={handleDirections}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.websiteButton}>
          <Text style={styles.buttonText}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.images}>
        {shelter.picture.slice(0, 2).map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.shelterImage}
          />
        ))}
      </View>
      <Text style={styles.shelterDescription}>
        {shelter.description}
      </Text>
      <View style={styles.fullReview}>
        <Text style={styles.fullReviewTitle}>BAGLY FULL REVIEW</Text>
        <View style={styles.reviews}>
          <View style={styles.traits}>
            <Text style={styles.traitText}>Safety: {shelter.safety_rating}/5</Text>
            <Text style={styles.traitText}>Inclusivity: {shelter.inclusivity_rating}/5</Text>
            <Text style={styles.traitText}>Trait 3</Text>
            <Text style={styles.traitText}>Trait 4</Text>
            <Text style={styles.traitText}>Trait 5</Text>
          </View>
          <Image
            style={styles.allOfThisIcon}
            source={require('frontend/assets/AllOfThisIcon.png')}
          />
          <View style={styles.sumRating}>
            <Text style={styles.sumRatingText}>{shelter.overall_rating.toFixed(1)}</Text>
            <Image
              style={styles.sumStarIcon}
              source={require('frontend/assets/teenyicons_star-solid.png')}
            />
          </View>
        </View>
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
    paddingBottom: 11,
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
    width: '100%',
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
    paddingTop: 10,
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
  images: {
    marginTop: 20,
    marginLeft: 12,
    flexDirection: 'row',
  },
  shelterImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 22,
    borderColor: '#000000',
    backgroundColor: '#D9D9D9',
  },
  shelterDescription: {
    width: 340,
    height: 180,
    marginLeft: 13,
    marginTop: 19,
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18.15,
    color: '#1E1E1E',
  },
  fullReview: {
    marginTop: 10,
    marginLeft: 12,
  },
  fullReviewTitle: {
    width: 247,
    height: 43,
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 29.05,
    color: '#1E1E1E',
  },
  traits: {
    width: 150,
  },
  reviews: {
    flexDirection: 'row',
  },
  traitText: {
    marginLeft: 2,
    height: 28,
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18.15,
    color: '#1E1E1E',
  },
  allOfThisIcon: {
    marginLeft: 24,
  },
  sumRating: {
    marginTop: 39,
    flexDirection: 'row',
    marginLeft: 19,
  },
  sumRatingText: {
    width: 84,
    height: 82,
    fontSize: 48,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 58.09,
  },
  sumStarIcon: {
    marginTop: 14,
  },
});
