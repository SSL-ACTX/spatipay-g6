import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

export default function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'Inter_700Bold' }]}>Welcome To Spatipay</Text>
      <Text style={[styles.subtitle, { fontFamily: 'Inter_400Regular' }]}>Where Musical Excellence Meets Professionalism</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.buttonText, { fontFamily: 'Inter_400Regular' }]}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.alreadyText}>
          <Text style={styles.alreadyTextPart}>Already have an account? </Text>
          <Text style={styles.loginText}>Login</Text>
        </Text>
      </TouchableOpacity>
      <Image style={styles.logo} source={require('../assets/spotify-logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2EB872',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 38,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50,
  },
  alreadyText: {
    fontSize: 15,
    marginBottom: 20,
  },
  alreadyTextPart: {
    color: '#fff',
  },
  loginText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
    tintColor: '#1E865B',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 5,
    marginTop: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

