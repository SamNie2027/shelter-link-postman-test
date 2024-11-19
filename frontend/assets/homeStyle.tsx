// styles.js
import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  welcomeHeader: {
    fontSize: 36,
    fontFamily: 'Inter',
    textAlign: 'center', // Horizontally center the text
  },
  welcomeContainer: {
    backgroundColor: '#c4c4c4',
    width: '100%',
    flex: 1,  // Makes the container take up the full available height
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',      // Centers content horizontally
  }
});

export default homeStyle;