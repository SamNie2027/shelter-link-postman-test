import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// test data for filters
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

// dropdown style for now
const FiltersDropdown = () => {
  const [value, setValue] = useState(null);

  return (
    <TouchableOpacity style={styles.dropdownContainer}>
      <Dropdown
        style={styles.filtersDropdown}
        placeholderStyle={styles.filtersText}
        selectedTextStyle={styles.filtersText}
        inputSearchStyle={styles.filtersText}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Filters"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        // replacing default dropdown image
        // to do: see about changing image when filters is clicked
        renderRightIcon={() => (
          <Image
            source={require('frontend/assets/dropdown.png')}
            style={styles.customIcon}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filtersDropdown: {
    width: 82,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
  },
  filtersText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15.73,
    color: '#000000',
    marginLeft: 16,
  },
  customIcon: {
    width: 10,
    height: 5,
    marginRight: 9,
  },
});

export default FiltersDropdown;
