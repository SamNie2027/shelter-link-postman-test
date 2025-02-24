import { bodyFont } from '../../constants';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoImage} />
      <Text style={styles.text}>BAGLY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 30,
    flexDirection: 'row', // align logo image + text
    alignItems: 'center',
  },
  logoImage: {
    width: 24,
    height: 24,
    backgroundColor: '#E2E2E2',
    borderRadius: 12,
  },
  text: {
    marginLeft: 8,
    fontFamily: bodyFont,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30,
    color: '#000000',
  },
});

export default Logo;
