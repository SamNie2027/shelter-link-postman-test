import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

const SignUpWizard = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // error states
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnim] = useState(new Animated.Value(0));

  // password strength
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // define steps
  const steps = [
    {
      title: 'Sign Up',
      fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'password'],
    },
    {
      // can add more pages here; just filler rn
      // title: "Contact Information",
      // fields: ["email", "phoneNumber"],
    },
  ];

  // slide animation
  const animateSlide = (direction) => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: direction === 'right' ? 100 : -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // validations
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const strength = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordStrength(strength);
    return Object.values(strength).every(Boolean);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // validation error messages for sign up sheet
  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        return validateEmail(value) ? '' : 'Please enter a valid email';
      case 'phoneNumber':
        return validatePhoneNumber(value)
          ? ''
          : 'Please enter a valid phone number';
      case 'password':
        return validatePassword(value)
          ? ''
          : 'Password does not meet requirements';
      default:
        return '';
    }
  };

  const validateStep = (stepIndex) => {
    const currentFields = steps[stepIndex].fields;
    const stepErrors = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        stepErrors[field] = error;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      animateSlide('right');
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    animateSlide('left');
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // submit form
      console.log('Form submitted:', formData);
    }
  };

  // render form fields based on current page
  const renderFields = () => {
    const currentFields = steps[currentStep].fields;

    return (
      <Animated.View
        style={[
          styles.fieldsContainer,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      >
        {currentFields.includes('firstName') && (
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>First Name*</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              value={formData.firstName}
              placeholder="Enter text here..."
              onChangeText={(text) => handleChange('firstName', text)}
              autoCapitalize="words"
              placeholderTextColor="#9C9A9A"
            />
            {errors.firstName ? (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            ) : null}
          </View>
        )}

        {currentFields.includes('lastName') && (
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Last Name*</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              value={formData.lastName}
              placeholder="Enter text here..."
              onChangeText={(text) => handleChange('lastName', text)}
              autoCapitalize="words"
              placeholderTextColor="#9C9A9A"
            />
            {errors.lastName ? (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            ) : null}
          </View>
        )}

        {currentFields.includes('email') && (
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Email*</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              placeholder="Enter text here..."
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9C9A9A"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
        )}

        {currentFields.includes('phoneNumber') && (
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Phone Number</Text>
            <TextInput
              style={[styles.input, errors.phoneNumber && styles.inputError]}
              value={formData.phoneNumber}
              placeholder="Enter text here..."
              onChangeText={(text) => handleChange('phoneNumber', text)}
              keyboardType="phone-pad"
              placeholderTextColor="#9C9A9A"
            />
            {errors.phoneNumber ? (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            ) : null}
          </View>
        )}

        {currentFields.includes('password') && (
          <View style={styles.formFields}>
            <Text style={styles.modalFieldText}>Password*</Text>
            <View style={styles.passwordRequirements}>
              <Text
                style={[
                  styles.requirementText,
                  passwordStrength.hasMinLength ? styles.requirementMet : null,
                ]}
              >
                Password Requirements
              </Text>
              {/*can include these if we wanna list out the password reqs*/}
              {/*<Text style={[*/}
              {/*  styles.requirementText,*/}
              {/*  passwordStrength.hasUpperCase ? styles.requirementMet : null*/}
              {/*]}>• At least one uppercase letter</Text>*/}
              {/*<Text style={[*/}
              {/*  styles.requirementText,*/}
              {/*  passwordStrength.hasLowerCase ? styles.requirementMet : null*/}
              {/*]}>• At least one lowercase letter</Text>*/}
              {/*<Text style={[*/}
              {/*  styles.requirementText,*/}
              {/*  passwordStrength.hasNumber ? styles.requirementMet : null*/}
              {/*]}>• At least one number</Text>*/}
              {/*<Text style={[*/}
              {/*  styles.requirementText,*/}
              {/*  passwordStrength.hasSpecialChar ? styles.requirementMet : null*/}
              {/*]}>• At least one special character</Text>*/}
            </View>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={formData.password}
              placeholder="Enter text here..."
              secureTextEntry
              onChangeText={(text) => handleChange('password', text)}
              placeholderTextColor="#9C9A9A"
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.modalForm}>
              <Text style={styles.modalTitleText}>
                {steps[currentStep].title}
              </Text>

              {/*/!* Progress Indicator *!/*/}
              {/*<View style={styles.progressContainer}>*/}
              {/*  {steps.map((_, index) => (*/}
              {/*    <View*/}
              {/*      key={index}*/}
              {/*      style={[*/}
              {/*        styles.progressDot,*/}
              {/*        currentStep === index && styles.progressDotActive,*/}
              {/*        currentStep > index && styles.progressDotCompleted*/}
              {/*      ]}*/}
              {/*    />*/}
              {/*  ))}*/}
              {/*</View>*/}

              {renderFields()}

              <View style={styles.buttonContainer}>
                {currentStep > 0 && (
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handlePrev}
                  >
                    <Text style={styles.buttonSecondaryText}>Previous</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={
                    currentStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                >
                  <Text style={styles.buttonPrimaryText}>
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: 318,
    height: 658,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 39,
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
    marginBottom: 24,
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
  inputError: {
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
  },
  passwordRequirements: {
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 12,
    color: '#9C9A9A',
    marginBottom: 4,
  },
  requirementMet: {
    color: '#4CAF50',
  },
  // progressContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginBottom: 16,  // Reduced from 24 to give better spacing with title
  //   marginTop: 8,      // Added to give some space from the top
  // },
  // progressDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#E8E8E8',
  //   marginHorizontal: 4,
  // },
  // progressDotActive: {
  //   backgroundColor: '#007AFF',
  //   transform: [{ scale: 1.2 }],
  // },
  // progressDotCompleted: {
  //   backgroundColor: '#4CAF50',
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: '#F5F5F5',
  },
  buttonPrimaryText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  fieldsContainer: {
    width: '100%',
  },
});

export default SignUpWizard;
