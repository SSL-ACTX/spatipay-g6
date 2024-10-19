import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function SignupScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'SpotifyMix-Bold': require('../assets/fonts/SpotifyMix-Bold.ttf'),
    'SpotifyMix-Regular': require('../assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('../assets/fonts/SpotifyMix-Medium.ttf'),
  });

  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'SpotifyMix-Bold' }]}>Sign up to Spatipay</Text>
      <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('Login')}>
        <Image source={require('../assets/google-logo.webp')} style={styles.googleLogo} />
        <Text style={[styles.googleText, { fontFamily: 'SpotifyMix-Regular' }]}>Sign up with Google</Text>
      </TouchableOpacity>

      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={[styles.orText, { fontFamily: 'SpotifyMix-Medium' }]}>Or continue with Email</Text>
        <View style={styles.separator} />
      </View>

      {/* Input fields with labels */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { fontFamily: 'SpotifyMix-Regular' }]}>Enter your name</Text>
        <TextInput placeholder="Enter your name" style={styles.input} />

        <Text style={[styles.label, { fontFamily: 'SpotifyMix-Regular' }]}>Enter username</Text>
        <TextInput placeholder="Enter username" style={styles.input} />

        <Text style={[styles.label, { fontFamily: 'SpotifyMix-Regular' }]}>Enter Email</Text>
        <TextInput placeholder="Enter Email" style={styles.input} />

        <Text style={[styles.label, { fontFamily: 'SpotifyMix-Regular' }]}>Enter password</Text>
        <TextInput placeholder="Enter password" style={styles.input} secureTextEntry />
      </View>

      {/* Checkbox for terms agreement */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]} />
        <Text style={[styles.checkboxText, { fontFamily: 'SpotifyMix-Regular' }]}>I agree with the Terms of Service and Privacy policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={[styles.buttonText, { fontFamily: 'SpotifyMix-Bold' }]}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.loginText, { fontFamily: 'SpotifyMix-Regular' }]}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 10, // Reduced margin below the title
    color: '#fff',
  },
  googleButton: {
    width: '60%',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  orText: {
    color: '#000',
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 35, // Changed radius to 35
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#2EB872',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkboxChecked: {
    backgroundColor: '#000', // Color when checked (gold)
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

