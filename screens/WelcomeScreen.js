import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const navigation = useNavigation(); // direct access sht

  const overlayImageAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(overlayImageAnimatedValue, {
          toValue: 80,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(overlayImageAnimatedValue, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [overlayImageAnimatedValue]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { fontFamily: 'Inter_700Bold' }]}>Welcome To Spatipay</Text>
        <Text style={[styles.subtitle, { fontFamily: 'Inter_400Regular' }]}>Where Musical Excellence Meets Professionalism</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to Signup');
          navigation.navigate('Signup');
        }}
      >
        <Text style={[styles.buttonText, { fontFamily: 'Inter_700Bold' }]}>Sign up</Text>
      </TouchableOpacity>
      <Animated.Image
        source={require('../assets/cloud.png')}
        style={[styles.overlayImage, {
          transform: [{ translateX: overlayImageAnimatedValue }],
        }]}
      />
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
  titleContainer: {
    position: 'absolute',
    top: '12%',
    alignItems: 'center',
    zIndex: 10, 
  },
  title: {
    fontSize: 38,
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  alreadyText: {
    fontSize: 16,
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
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 5,
    marginTop: '100%',
    zIndex: 10,  // Ensure button is on top
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  overlayImage: {
    position: 'absolute',
    alignSelf: 'center',
    top: '17%',
  },
});

