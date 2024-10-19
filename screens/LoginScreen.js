import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'SpotifyMix-Bold': require('../assets/fonts/SpotifyMix-Bold.ttf'),
    'SpotifyMix-Regular': require('../assets/fonts/SpotifyMix-Regular.ttf'),
    'SpotifyMix-Medium': require('../assets/fonts/SpotifyMix-Medium.ttf'),
  });

  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home'); // Navigate to Home screen after successful login
    } catch (error) {
      Alert.alert('Error', error.message); // Show error message
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, { fontFamily: 'SpotifyMix-Bold' }]}>Login to Spatipay</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('../assets/google-logo.webp')} style={{ width: 20, height: 20, marginRight: 10 }} />
          <Text style={[styles.googleText, { fontFamily: 'SpotifyMix-Regular' }]}>Log in with Google</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={[styles.orText, { fontFamily: 'SpotifyMix-Regular' }]}>  Or log in with Email  </Text>
          <View style={styles.separator} />
        </View>
      </View>

      {/* Input fields centered vertically */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { fontFamily: 'SpotifyMix-Regular' }]}>Username or Email</Text>
        <TextInput
          placeholder="Username or Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail} // Update email state on text change
        />

        {/* Password label with Forgot? on the same line */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordLabel, { fontFamily: 'SpotifyMix-Regular' }]}>Password</Text>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={[styles.forgotText, { fontFamily: 'SpotifyMix-Regular' }]}>Forgot?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword} // Update password state on text change
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={[styles.buttonText, { fontFamily: 'SpotifyMix-Regular' }]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signupText, { fontFamily: 'SpotifyMix-Regular' }]}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 100, // Keep some padding from the top
    marginBottom: '-40%', // Adjusted margin to reduce space below
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 10, // Reduced margin below the title
    color: '#fff',
  },
  googleButton: {
    width: '60%',
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
  },
  googleText: {
    color: '#fff',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 10,
  },
  orText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center', // Centers input fields vertically
    alignItems: 'center', // Centers input fields horizontally
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
    marginBottom: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  passwordLabel: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotButton: {
    // Keeps Forgot? aligned to the right
  },
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 35,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});


