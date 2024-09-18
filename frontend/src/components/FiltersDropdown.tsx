import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const FiltersDropdown = () => {
  return (
      <TouchableOpacity style={styles.filtersDropdown}>
        <Text style={styles.filtersText}>Filters</Text>
        <Image
          source={require('frontend/assets/dropdown.png')}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filtersDropdown: {
    width: 82,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filtersText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15.73,
    color: '#000000',
    textAlign: 'center',
    marginRight: 8,
  },
  dropdownIcon: {
    width: 10,
    height: 5,
  },
});

export default FiltersDropdown;
