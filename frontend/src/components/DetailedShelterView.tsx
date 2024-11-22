import Logo from '../components/Logo';
import {
  Image,
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
      <View style={styles.images}>
        <View style={styles.shelterImage} />
        <View style={styles.shelterImage} />
      </View>
      <Text style={styles.shelterDescription}>
        Longer description, Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </Text>
      <View style={styles.fullReview}>
        <Text style={styles.fullReviewTitle}>BAGLY FULL REVIEW</Text>
        <View style={styles.reviews}>
          <View>
            <Text style={styles.traitText}>Trait 1</Text>
            <Text style={styles.traitText}>Trait 2</Text>
            <Text style={styles.traitText}>Trait 3</Text>
            <Text style={styles.traitText}>Trait 4</Text>
            <Text style={styles.traitText}>Trait 5</Text>
          </View>
          <Image
            style={styles.allOfThisIcon}
            source={require('frontend/assets/AllOfThisIcon.png')}
          />
          <View style={styles.sumRating}>
            <Text style={styles.sumRatingText}>4.8</Text>
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
  reviews: {
    flexDirection: 'row',
  },
  traitText: {
    marginLeft: 2,
    width: 57,
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
    marginTop: 14
  }
});
