import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TextInput } from 'react-native';

const SignUpModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalForm}>
          <Text style={styles.modalTitleText}>Sign Up</Text>
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>First Name*</Text>
            <TextInput
              style={styles.input}
              value={username}
              placeholder={'Enter text here...'}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize={'none'}
              placeholderTextColor={'#9C9A9A'}
            />
          </View>
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Last Name*</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Enter text here...'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#9C9A9A'}
            />
          </View>
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Email*</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Enter text here...'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#9C9A9A'}
            />
          </View>
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Enter text here...'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#9C9A9A'}
            />
          </View>
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Password*</Text>
            <TextInput
              style={styles.input}
              value={password}
              placeholder={'Enter text here...'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#9C9A9A'}
            />
          </View>
        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // adds bg tint
  },
  modalView: {
    width: 318,
    height: 658,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 39,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalForm: {
    marginBottom: 24,
  },
  modalTitleText: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
  },
  formFields: {
    marginBottom: 12,
  },
  modalFieldText: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'ProximaNova-Regular',
  },
  input: {
    height: 46,
    width: 270,
    marginBottom: 12,
    padding: 10,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default SignUpModal;
