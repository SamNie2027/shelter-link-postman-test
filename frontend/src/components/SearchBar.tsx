import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = () => {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={[styles.searchInput, { opacity: isTyping ? 1 : 0.6 }]}
        placeholder="SEARCH"
        placeholderTextColor='#00000099'
        onChangeText={(text) => setIsTyping(text.length > 0)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: 360,
    height: 36,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'IstokWebRegular',
    fontSize: 14,
    fontWeight: '500',
    color: '#00000099',
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 2,
    lineHeight: 19.36,
    opacity: 0.6,
  },
});

export default SearchBar;
