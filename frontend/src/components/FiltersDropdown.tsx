import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];

// created a multi-select component for filters
// need to add some sort of indication of what is currently selected in dropdown list
const DropdownComponent = () => {
  const [selected, setSelected] = useState([]);

  return (
    <View>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle} // Add this
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Filters"
        searchPlaceholder="SEARCH"
        value={selected}
        onChange={(item) => {
          // @ts-ignore
          setSelected(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 87,
    height: 28,
    paddingRight: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
  },
  placeholderStyle: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#000000',
    marginLeft: 16,
  },
  selectedTextStyle: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#000000',
  },
  inputSearchStyle: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#00000099',
  },
  customIcon: {
    width: 10,
    height: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default DropdownComponent;
