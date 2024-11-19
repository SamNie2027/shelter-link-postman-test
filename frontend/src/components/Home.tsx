import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import homeStyle from '../../assets/homeStyle';

export const Home = () => {

  return (
    <div
      style={homeStyle.welcomeContainer}>
      <h1 style={ homeStyle.welcomeHeader }>Welcome to BAGLY!</h1>
    </div>
  );
};


export default Home;
