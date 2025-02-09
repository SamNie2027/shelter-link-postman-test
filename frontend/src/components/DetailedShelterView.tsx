import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  backgroundColor,
  headerFont,
  darkMainColor,
  bodyFont,
  mainColor,
  buttonBackgroundColor,
  descriptionFontColor,
} from '../../constants';
import { useFonts } from 'expo-font';
import { NewShelterInput } from '../../../backend/src/dtos/newShelterDTO';
import { DayOfWeek } from '../../../backend/src/types';

interface Props {
  shelter: NewShelterInput;
}

export const DetailedShelterView: React.FC<Props> = ({ shelter }) => {
  const [showAllHours, setShowAllHours] = useState(false);

  // for now, this redirects to google maps based on lat and long
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;
    Linking.openURL(url);
  };

  // website will pop up if there is one
  const handleWebsite = () => {
    if (shelter.website) {
      Linking.openURL(shelter.website);
    }
  };

  const [fonts] = useFonts({
    IstokWebRegular: require('../../assets/fonts/IstokWebRegular.ttf'),
    JomhuriaRegular: require('../../assets/fonts/JomhuriaRegular.ttf'),
  });

  // for now, this gives the option to confirm if you want to call the shelter number
  // figure out how number/email maybe should be displayed?
  const handleContact = () => {
    Linking.openURL(`tel:${shelter.phone_number}`);
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getHoursForDay = (day: DayOfWeek) => {
    if (!shelter.hours || !shelter.hours[day]) return 'Closed';
    const dayHours = shelter.hours[day];
    if (!dayHours || dayHours.is_closed) return 'Closed';
    return `${formatTime(dayHours.opening_time)} - ${formatTime(
      dayHours.closing_time
    )}`;
  };

  const getCurrentDayHours = () => {
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    const daysEnum: DayOfWeek[] = [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
      DayOfWeek.SUNDAY,
    ];
    return getHoursForDay(daysEnum[dayIndex]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shelterNameContainer}>
        <Text style={styles.shelterNameText}>{shelter.name}</Text>
      </View>
      <View style={styles.quickInfoContainer}>
        {shelter.rating !== undefined && (
          <Text style={styles.quickInfoText}>
            {shelter.rating.toFixed(1)} STARS
          </Text>
        )}
        <Text style={styles.quickInfoText}>
          {shelter.address.street}, {shelter.address.city},{' '}
          {shelter.address.state}{' '}
        </Text>

        <TouchableOpacity
          style={styles.hoursContainer}
          onPress={() => setShowAllHours(!showAllHours)}
        >
          <View style={styles.hoursRow}>
            <Text style={styles.dayText}>Today:</Text>
            <Text style={styles.hoursText}>{getCurrentDayHours()}</Text>
            <Text
              style={[
                styles.dropdownArrow,
                showAllHours && styles.dropdownArrowUp,
              ]}
            >
              ▼
            </Text>
          </View>
        </TouchableOpacity>

        {showAllHours && (
          <View style={styles.allHoursContainer}>
            {Object.values(DayOfWeek).map((day) => (
              <View key={day} style={styles.hoursRow}>
                <Text style={styles.dayText}>{day}:</Text>
                <Text
                  style={[
                    styles.hoursText,
                    (!shelter.hours[day] || shelter.hours[day]?.is_closed) &&
                      styles.closedText,
                  ]}
                >
                  {getHoursForDay(day)}
                </Text>
              </View>
            ))}
          </View>
        )}

      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={handleDirections}
        >
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
        {shelter.website && (
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={handleWebsite}
          >
            <Text style={styles.buttonText}>Website</Text>
          </TouchableOpacity>
        )}
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
      <Text style={styles.shelterDescription}>{shelter.description}</Text>
      <View style={styles.fullReview}>
        <View style={styles.fullReviewTitleContainer}>
          <Text style={styles.fullReviewTitle}>BAGLY REVIEW</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  logoContainer: {
    alignItems: 'flex-start',
    paddingLeft: 12,
    paddingTop: 9,
  },
  shelterNameContainer: {
    height: 44,
    width: '100%',
    marginLeft: 14,
    marginTop: 23,
  },
  shelterNameText: {
    fontFamily: headerFont,
    fontSize: 64,
    fontWeight: '400',
    lineHeight: 64,
    color: darkMainColor,
  },
  quickInfoContainer: {
    width: '100%',
    height: 116,
    marginLeft: 12,
    marginTop: 6,
  },
  quickInfoText: {
    fontFamily: bodyFont,
    color: descriptionFontColor,
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 4,
    lineHeight: 21.59,
  },
  buttonsContainer: {
    marginTop: 19,
    marginLeft: 15,
    flexDirection: 'row',
    width: '100%',
    height: 35.61,
  },
  directionsButton: {
    width: 106,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: mainColor,
    backgroundColor: buttonBackgroundColor,
    fontFamily: bodyFont,
    alignItems: 'center',
    justifyContent: 'center',
  },
  websiteButton: {
    width: 115,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: darkMainColor,
    backgroundColor: buttonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  contactButton: {
    width: 115,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: darkMainColor,
    backgroundColor: buttonBackgroundColor,
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
  images: {
    width: '90%',
    height: 150,
    marginTop: 30.39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  shelterImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 3,
    marginRight: 22,
    borderColor: darkMainColor,
    backgroundColor: '#D9D9D9',
  },
  shelterDescription: {
    width: 340,
    marginLeft: 13,
    marginTop: 19,
    fontSize: 15,
    fontFamily: bodyFont,
    fontWeight: '400',
    lineHeight: 21.59,
    color: descriptionFontColor,
  },
  fullReview: {
    marginTop: 40,
    marginLeft: 13,
    width: 330,
    height: 176,
  },
  fullReviewTitleContainer: {
    width: '100%',
    height: 40,
  },
  fullReviewTitle: {
    fontSize: 64,
    fontFamily: headerFont,
    fontWeight: '400',
    lineHeight: 64,
    color: darkMainColor,
  },
  hoursContainer: {
    paddingVertical: 8,
    marginVertical: 4,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  dropdownArrow: {
    fontSize: 12,
    color: mainColor,
    marginLeft: 8,
  },
  dropdownArrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  allHoursContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  closedText: {
    color: '#FF4444',
  },
  hoursSection: {
    marginTop: 20,
    marginLeft: 12,
  },
  dayHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  arrowButton: {
    padding: 8,
    marginLeft: 8,
  },
  arrow: {
    color: mainColor,
    fontSize: 12,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  dayText: {
    fontFamily: bodyFont,
    fontSize: 15,
    fontWeight: '700',
    color: descriptionFontColor,
    marginRight: 14,
    lineHeight: 21.59,
    width: 60,
  },
  hoursText: {
    fontFamily: bodyFont,
    fontWeight: '700',
    fontSize: 15,
    color: mainColor,
    lineHeight: 21.59,
  },
});
